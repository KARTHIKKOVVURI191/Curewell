import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DoctorNavbar from '../Navbar/DoctorNavbar';

function ViewMessages() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: "Karthik",
            email: "2300030849@kluniversity.in",
            phone: "8143181818",
            subject: "Appointment Query",
            message: "I would like to schedule an appointment for a regular checkup. Please let me know the available slots.",
            date: "2024-03-20",
            status: "Unread"
        },
        {
            id: 2,
            name: "Uday",
            email: "uday@example.com",
            phone: "9876543210",
            subject: "Emergency Consultation",
            message: "Need urgent consultation for severe headache and fever. Please advise.",
            date: "2024-03-21",
            status: "Read"
        },
        {
            id: 3,
            name: "Vandana",
            email: "vandana@example.com",
            phone: "8765432109",
            subject: "Follow-up Appointment",
            message: "I need to schedule a follow-up appointment for my previous treatment. Kindly suggest a suitable time.",
            date: "2024-03-22",
            status: "Unread"
        }
    ]);

    // Check if user is a doctor
    React.useEffect(() => {
        if (!currentUser || currentUser.role !== "doctor") {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleMarkAsRead = (messageId) => {
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === messageId
                    ? { ...msg, status: "Read" }
                    : msg
            )
        );
    };

    return (
        <>
            <DoctorNavbar />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pt-24 px-4 md:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {messages.map((message) => (
                                        <tr key={message.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.subject}</td>
                                            <td className="px-6 py-4 max-w-xs truncate">{message.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    message.status === "Read" 
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                    {message.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button 
                                                    onClick={() => handleMarkAsRead(message.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Mark as Read
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ViewMessages; 