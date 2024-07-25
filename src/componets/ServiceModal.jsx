import React, { useState } from 'react';

const services = [
    'Polishing',
    'Ceramic coating',
    'Graphene Coating',
    'PPF - (Paint Protection Film)',
    'Detailing',
    'Headlight and taillight restoration',
    'Windscreen restoration and rain treatment',
    'Trim Restoration',
    'Alloy wheel detailing and restoration',
    'Interior deodorization',
    'Leather Restoration',
    'Roof Liner Restoration',
];

const ServiceModal = ({ isOpen, onClose }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const handleCheckboxChange = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const handleSubmit = () => {
        const message = `Hi Gafar. I’m interested in the following services: ${selectedServices.join(', ')}`;
        const whatsappUrl = `https://wa.me/+919400310556?text=${encodeURIComponent(message)}`;
        setSelectedServices([])
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-70 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Select Services</h2>
                <div className="space-y-2 mb-4">
                    {services.map((service) => (
                        <div key={service} className="flex items-center">
                            <input
                                type="checkbox"
                                id={service}
                                className="mr-2"
                                onChange={() => handleCheckboxChange(service)}
                            />
                            <label htmlFor={service} className="text-lg">{service}</label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-700 bg-opacity-80 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
