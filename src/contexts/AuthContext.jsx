import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  async function signup(email, password, name, photoURL) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: name,
      photoURL
    });

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        imageUrl: photoURL
      })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);

    return result;
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);

    return result;
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { email, displayName, photoURL } = result.user;

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: displayName,
        imageUrl: photoURL
      })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);

    return result;
  }

  async function logout() {
    localStorage.removeItem("token");
    setToken(null);
    await signOut(auth);
    setCurrentUser(null);
  }

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3000/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchMe();
  }, [token]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    token,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
