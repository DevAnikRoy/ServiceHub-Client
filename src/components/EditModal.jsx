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
            const res = await fetch(`https://service-assingment-server.vercel.app/services/${service._id}`, {
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl w-full max-w-lg space-y-5 shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
            >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    ✏️ Edit Service
                </h2>
                
                <p className='font-semibold'>Service Name:</p>
                <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    placeholder="Service Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className='font-semibold'>Service Price:</p>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className='font-semibold'>Service Area:</p>
                <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    placeholder="Service Area"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <p className='font-semibold'>image Url:</p>
                <input
                    type="text"
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <p className='font-semibold'>Description:</p>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>

    );
}
