import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import DoctorNavbar from '../Navbar/DoctorNavbar';

function ViewAppointments() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: "Karthik",
            date: "2024-03-20",
            time: "10:00 AM",
            reason: "Regular Checkup",
            status: "Scheduled",
            age: 25,
            gender: "Male",
            contact: "+91 9876543210",
            symptoms: "Fever and cold"
        },
        {
            id: 2,
            patientName: "Uday",
            date: "2024-03-21",
            time: "2:30 PM",
            reason: "Follow-up Consultation",
            status: "Pending",
            age: 28,
            gender: "Male",
            contact: "+91 9876543211",
            symptoms: "Headache and fatigue"
        }
    ]);

    // Check if user is a doctor
    React.useEffect(() => {
        if (!currentUser || currentUser.role !== "doctor") {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    const handleAcceptAppointment = async (appointmentId) => {
        try {
            // Update appointment status
            setAppointments(prevAppointments => 
                prevAppointments.map(app => 
                    app.id === appointmentId 
                        ? { ...app, status: "Accepted" }
                        : app
                )
            );

            // Show success message
            await Swal.fire({
                title: "Appointment Accepted!",
                text: "The appointment has been successfully accepted",
                icon: "success",
                confirmButtonText: "Ok"
            });

            // Close the modal if it's open
            if (selectedAppointment?.id === appointmentId) {
                handleCloseModal();
            }
        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: "Failed to accept appointment. Please try again.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
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
                    <h1 className="text-3xl font-bold mb-8">View Appointments</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{appointment.reason}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    appointment.status === "Accepted" 
                                                        ? "bg-green-100 text-green-800"
                                                        : appointment.status === "Scheduled" 
                                                            ? "bg-blue-100 text-blue-800" 
                                                            : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                    {appointment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button 
                                                    onClick={() => handleViewDetails(appointment)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    View Details
                                                </button>
                                                {appointment.status !== "Accepted" && (
                                                    <button 
                                                        onClick={() => handleAcceptAppointment(appointment.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Appointment Details Modal */}
                {selectedAppointment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Appointment Details</h2>
                                <button 
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700">Patient Information</h3>
                                    <p>Name: {selectedAppointment.patientName}</p>
                                    <p>Age: {selectedAppointment.age}</p>
                                    <p>Gender: {selectedAppointment.gender}</p>
                                    <p>Contact: {selectedAppointment.contact}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Appointment Information</h3>
                                    <p>Date: {selectedAppointment.date}</p>
                                    <p>Time: {selectedAppointment.time}</p>
                                    <p>Reason: {selectedAppointment.reason}</p>
                                    <p>Status: {selectedAppointment.status}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Symptoms</h3>
                                    <p>{selectedAppointment.symptoms}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button 
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Close
                                </button>
                                {selectedAppointment.status !== "Accepted" && (
                                    <button 
                                        onClick={() => handleAcceptAppointment(selectedAppointment.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Accept Appointment
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </>
    );
}

export default ViewAppointments; 