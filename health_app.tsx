import React, { useState, useEffect } from 'react';
import { Mail, User, Calendar, Pill, Send, Plus, Edit, Trash2 } from 'lucide-react';

// Mock Firebase functions (replace with actual Firebase in your project)
const mockFirebase = {
  patients: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      age: 35,
      phone: '+1234567890',
      address: '123 Main St, City',
      medicalHistory: 'Hypertension, Diabetes'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 28,
      phone: '+1234567891',
      address: '456 Oak Ave, City',
      medicalHistory: 'Asthma'
    }
  ],
  prescriptions: [
    {
      id: '1',
      patientId: '1',
      medication: 'Metformin 500mg',
      dosage: '1 tablet twice daily',
      duration: '30 days',
      instructions: 'Take with meals',
      date: '2024-01-15'
    },
    {
      id: '2',
      patientId: '2',
      medication: 'Albuterol Inhaler',
      dosage: '2 puffs as needed',
      duration: '90 days',
      instructions: 'Use during breathing difficulties',
      date: '2024-01-10'
    }
  ]
};

const HealthApp = () => {
  const [patients, setPatients] = useState(mockFirebase.patients);
  const [prescriptions, setPrescriptions] = useState(mockFirebase.prescriptions);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('patients');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: '',
    medicalHistory: ''
  });

  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    medication: '',
    dosage: '',
    duration: '',
    instructions: '',
    date: new Date().toISOString().split('T')[0]
  });

  const addPatient = () => {
    const patient = {
      id: Date.now().toString(),
      ...newPatient,
      age: parseInt(newPatient.age)
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      email: '',
      age: '',
      phone: '',
      address: '',
      medicalHistory: ''
    });
    setShowAddPatient(false);
  };

  const addPrescription = () => {
    const prescription = {
      id: Date.now().toString(),
      ...newPrescription
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      patientId: '',
      medication: '',
      dosage: '',
      duration: '',
      instructions: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddPrescription(false);
  };

  const sendPrescriptionEmail = (prescription) => {
    const patient = patients.find(p => p.id === prescription.patientId);
    if (patient) {
      // Mock email sending (replace with actual email service)
      setEmailStatus('sending');
      setTimeout(() => {
        setEmailStatus('sent');
        setTimeout(() => setEmailStatus(''), 3000);
      }, 2000);
    }
  };

  const getPatientPrescriptions = (patientId) => {
    return prescriptions.filter(p => p.patientId === patientId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <User className="mr-2" />
            Health Management System
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Patients
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'prescriptions'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Prescriptions
          </button>
        </div>

        {/* Email Status */}
        {emailStatus && (
          <div className={`p-4 rounded-lg mb-4 ${
            emailStatus === 'sending' ? 'bg-yellow-100 text-yellow-800' :
            emailStatus === 'sent' ? 'bg-green-100 text-green-800' : ''
          }`}>
            {emailStatus === 'sending' ? 'Sending email...' : 'Email sent successfully!'}
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Patients</h2>
              <button
                onClick={() => setShowAddPatient(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </button>
            </div>

            {/* Add Patient Form */}
            {showAddPatient && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Add New Patient</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Medical History"
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={addPatient}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Patient
                  </button>
                  <button
                    onClick={() => setShowAddPatient(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Patients List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <div key={patient.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <User className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-gray-600">Age: {patient.age}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Phone:</strong> {patient.phone}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Prescriptions</h2>
              <button
                onClick={() => setShowAddPrescription(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Prescription
              </button>
            </div>

            {/* Add Prescription Form */}
            {showAddPrescription && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Add New Prescription</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newPrescription.patientId}
                    onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
                    className="p-2 border rounded-lg"
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Medication"
                    value={newPrescription.medication}
                    onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Instructions"
                    value={newPrescription.instructions}
                    onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="date"
                    value={newPrescription.date}
                    onChange={(e) => setNewPrescription({...newPrescription, date: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={addPrescription}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Prescription
                  </button>
                  <button
                    onClick={() => setShowAddPrescription(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Prescriptions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prescriptions.map((prescription) => {
                const patient = patients.find(p => p.id === prescription.patientId);
                return (
                  <div key={prescription.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <Pill className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <h3 className="font-semibold text-lg">{prescription.medication}</h3>
                          <p className="text-gray-600">Patient: {patient?.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dosage:</strong> {prescription.dosage}</p>
                      <p><strong>Duration:</strong> {prescription.duration}</p>
                      <p><strong>Instructions:</strong> {prescription.instructions}</p>
                      <p><strong>Date:</strong> {prescription.date}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => sendPrescriptionEmail(prescription)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email to Patient
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Patient Details</h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.age}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.address}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Medical History</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.medicalHistory}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-3">Prescriptions</h4>
                  <div className="space-y-3">
                    {getPatientPrescriptions(selectedPatient.id).map((prescription) => (
                      <div key={prescription.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{prescription.medication}</h5>
                            <p className="text-sm text-gray-600">
                              {prescription.dosage} - {prescription.duration}
                            </p>
                            <p className="text-sm text-gray-600">{prescription.instructions}</p>
                            <p className="text-xs text-gray-500 mt-1">Date: {prescription.date}</p>
                          </div>
                          <button
                            onClick={() => sendPrescriptionEmail(prescription)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthApp;