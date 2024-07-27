import React, { useState } from 'react';
import Select from 'react-select';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const enquiriesCollection = collection(db, 'enquiries');

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconPng,
    iconUrl: markerIconPng,
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const services = [
    { value: 'Polishing', label: 'Polishing' },
    { value: 'Ceramic coating', label: 'Ceramic coating' },
    { value: 'Graphene Coating', label: 'Graphene Coating' },
    { value: 'PPF - (Paint Protection Film)', label: 'PPF - (Paint Protection Film)' },
    { value: 'Detailing - Interior/Exterior', label: 'Detailing - Interior/Exterior' },
    { value: 'Headlight and taillight restoration', label: 'Headlight and taillight restoration' },
    { value: 'Windscreen restoration and rain treatment', label: 'Windscreen restoration and rain treatment' },
    { value: 'Trim Restoration', label: 'Trim Restoration' },
    { value: 'Alloy wheel detailing and restoration', label: 'Alloy wheel detailing and restoration' },
    { value: 'Interior deodorization', label: 'Interior deodorization' },
    { value: 'Leather Restoration', label: 'Leather Restoration' },
    { value: 'Roof Liner Restoration', label: 'Roof Liner Restoration' },
];

const carBrands = [
    'Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra & Mahindra',
    'Honda', 'Toyota', 'Ford', 'Nissan', 'Volkswagen', 'Renault',
    'BMW', 'Audi', 'Mercedes-Benz', 'Kia'
];

const carNames = [
    'Alto', 'Swift', 'Dzire', 'Baleno', 'Vitara Brezza', 'Ertiga',
    'i10', 'i20', 'Verna', 'Creta', 'Venue', 'Santro',
    'Nano', 'Tiago', 'Tigor', 'Nexon', 'Harrier', 'Safari',
    'Bolero', 'Scorpio', 'XUV300', 'XUV500', 'Thar', 'Alturas G4',
    'Amaze', 'City', 'Civic', 'BR-V', 'WR-V',
    'Innova Crysta', 'Fortuner', 'Corolla Altis', 'Yaris', 'Glanza',
    'EcoSport', 'Figo', 'Aspire', 'Endeavour',
    'Micra', 'Magnite', 'Kicks', 'X-Trail',
    'Polo', 'Vento', 'Taigun', 'Tiguan',
    'Kwid', 'Triber', 'Duster', 'Captur',
    '3 Series', '5 Series', 'X1', 'X3',
    'A3', 'A4', 'Q3', 'Q5',
    'A-Class', 'C-Class', 'E-Class', 'GLA',
    'Seltos', 'Sonet', 'Carnival'
];

const locations = ['Malappuram', 'Manjeri', 'Perinthalmanna', 'Ponnani', 'Tirur',
    'Nilambur', 'Kondotty', 'Eranad', 'Vallikkunnu', 'Kadalundi']

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        carBrand: '',
        carName: '',
        serviceRequired: [],
        phoneNumber: '',
        location: ''
    });

    const handleServiceChange = (selectedOptions) => {
        setFormData({
            ...formData,
            serviceRequired: selectedOptions.map(option => option.value)
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(formData.phoneNumber)) {
            toast.error('Please enter a valid phone number (10 digits).', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
            return;
        }

        const formattedData = {
            name: formData.name,
            carBrand: formData.carBrand,
            carName: formData.carName,
            servicesRequired: formData.serviceRequired,
            phoneNumber: formData.phoneNumber,
            location: formData.location,
            createdAt: new Date(),
            attended: false
        };

        try {
            const q = query(enquiriesCollection, where('phoneNumber', '==', formData.phoneNumber), where('attended', '==', false));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                toast.info('We have received your enquiry. We will contact you soon.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                setFormData({
                    name: '',
                    carBrand: '',
                    carName: '',
                    serviceRequired: [],
                    phoneNumber: '',
                    location: '',
                });
                return;
            }

            const docRef = await addDoc(enquiriesCollection, formattedData);
            console.log('Document written with ID: ', docRef.id);
            toast.success('Your enquiry has been sent!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
            setFormData({
                name: '',
                carBrand: '',
                carName: '',
                serviceRequired: [],
                phoneNumber: '',
                location: '',
            });
        } catch (error) {
            console.error('Error adding document:', error);
            let errorMessage = 'There was an error sending your enquiry.';
            if (error.code) {
                switch (error.code) {
                    case 'permission-denied':
                        errorMessage = 'You are not authorized to add enquiries.';
                        break;
                    case 'invalid-argument':
                        errorMessage = 'Please check the data you entered.';
                        break;
                    default:
                        errorMessage = 'An unexpected error occurred.';
                }
            }
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Send Us Your Enquiries</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center mb-6 w-full max-w-4xl">
                <div className='grid grid-cols-1 w-full'>
                    <label className="block text-sm font-medium">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                        <label className="block text-sm font-medium">Your Car Brand</label>
                        <input
                            type="text"
                            name="carBrand"
                            value={formData.carBrand}
                            onChange={handleChange}
                            list="car-brands"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <datalist id="car-brands">
                            {carBrands.map(brand => <option key={brand} value={brand} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Your Car Name</label>
                        <input
                            type="text"
                            name="carName"
                            value={formData.carName}
                            onChange={handleChange}
                            list="car-names"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <datalist id="car-names">
                            {carNames.map(name => <option key={name} value={name} />)}
                        </datalist>
                    </div>
                </div>
                <div className='grid grid-cols-1 w-full'>
                    <label className="block text-sm font-medium z-10">Service Required</label>
                    <Select
                        isMulti
                        name="serviceRequired"
                        options={services}
                        value={services.filter(service => formData.serviceRequired.includes(service.value))}
                        onChange={handleServiceChange}
                        className="mt-1 w-full"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                borderColor: '#d1d5db',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    borderColor: '#2563eb'
                                }
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#f59e0b',
                                color: 'white'
                            }),
                            multiValueLabel: (provided) => ({
                                ...provided,
                                color: 'white'
                            }),
                            multiValueRemove: (provided) => ({
                                ...provided,
                                color: 'white',
                                ':hover': {
                                    backgroundColor: '#4b5563',
                                    color: 'white'
                                }
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: '#fff',
                                color: state.isSelected ? 'white' : 'black',
                                '&:hover': {
                                    backgroundColor: '#fbbf24',
                                    color: 'black'
                                }
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent'
                            }),
                            menuList: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                                maxHeight: '160px',
                                overflowY: 'auto'
                            }),
                            indicatorSeparator: () => ({
                                display: 'none'
                            })
                        }}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                        <label className="block text-sm font-medium">Your Contact Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            pattern="[0-9]{10}"
                            required
                        />
                        <p className="text-sm text-gray-500">Enter a 10-digit phone number.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Your Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            list="locations"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <datalist id="locations">
                            {locations.map(loc => <option key={loc} value={loc} />)}
                        </datalist>
                    </div>
                </div>
                <button
                    type="submit"
                    className="relative px-6 py-3 bg-yellow-600 text-white rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out"
                >
                    <span className="relative">Submit</span>
                    <span className="absolute inset-0 bg-yellow-800 rounded-md opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-10"></span>
                </button>
            </form>
        </div>
    );
}

export default Contact;
