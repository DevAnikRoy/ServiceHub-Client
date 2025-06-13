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
      photoURL: photoURL
    });
    
    // Generate JWT token
    const userToken = await generateToken(result.user);
    localStorage.setItem('token', userToken);
    setToken(userToken);
    
    return result;
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Generate JWT token
    const userToken = await generateToken(result.user);
    localStorage.setItem('token', userToken);
    setToken(userToken);
    
    return result;
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Generate JWT token
    const userToken = await generateToken(result.user);
    localStorage.setItem('token', userToken);
    setToken(userToken);
    
    return result;
  }

  async function logout() {
    localStorage.removeItem('token');
    setToken(null);
    return signOut(auth);
  }

  async function generateToken(user) {
    // Simple JWT simulation - in production, this should be done server-side
    const tokenData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    return btoa(JSON.stringify(tokenData));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && !token) {
        const userToken = await generateToken(user);
        localStorage.setItem('token', userToken);
        setToken(userToken);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [token]);

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