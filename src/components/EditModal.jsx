import { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditModal({ service, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        serviceName: service.serviceName,
        price: service.price,
        serviceArea: service.serviceArea,
        imageURL: service.imageURL,
        description: service.description
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/services/${service._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price)
                })
            });

            if (!res.ok) throw new Error("Update failed");

            const updated = { ...service, ...formData };
            onUpdate(updated);
            onClose();
            toast.success("Service updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update service");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[95%] max-w-lg space-y-4 shadow-xl"
            >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Service</h2>

                <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    placeholder="Service Name"
                    className="input-style"
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="input-style"
                />

                <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    placeholder="Service Area"
                    className="input-style"
                />

                <input
                    type="text"
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="input-style"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="input-style"
                    rows={4}
                />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
