import React, { useState, useEffect } from 'react';

const CustomerPage = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [showOrderSection, setShowOrderSection] = useState(false);

    const customerSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6ScA16RqJQwqQsusoqHTqTmoRfApVDoGiBm92NoIbvLDBkVd9wu_YHIgAiCcZkXjSCZ1fXjwnzv8N/pub?output=csv";

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(customerSheetURL);
            const data = await response.text();
            const rows = data.split("\n").slice(1).map(row => row.split(","));

            const customer = rows.find(row => row[1].trim() === phone);

            if (customer) {
                setName(customer[2].trim());
                setAddress(customer[3].trim());
                setStatusMessage("Customer details found successfully.");
                setShowOrderSection(true);
            } else {
                setStatusMessage("Customer details not found. Please fill the form below.");
            }
        } catch (error) {
            setStatusMessage("Error fetching customer details. Please try again later.");
            console.error(error);
        }
    };

    const submitCustomerDetails = () => {
        if (!phone || !name || !address) {
            alert("Please fill all fields before submitting.");
            return;
        }
        setStatusMessage("Customer details captured successfully.");
        setShowOrderSection(true);
    };

    return (
        <div className="bg-gray-100 p-4 max-w-lg mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>

                <label className="block text-sm font-semibold">Phone Number:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Phone Number"
                />

                <div id="customerDetails">
                    <label className="block text-sm font-semibold">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />

                    <label className="block text-sm font-semibold">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>

                <button onClick={fetchCustomerDetails} className="bg-blue-500 text-white px-4 py-2 rounded">Check Details</button>
                <button onClick={submitCustomerDetails} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Submit</button>

                <p className="mt-4 text-center font-bold">{statusMessage}</p>

                {showOrderSection && (
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full">
                        Proceed to Order Veggies
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomerPage;
