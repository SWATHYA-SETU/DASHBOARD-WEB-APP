import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useAuth } from '../autocontext'; // Adjust the import path as needed
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, XMarkIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline';

const GET_CITIZEN_ID = gql`
  query GetCitizenId($email: String!) {
    citizens(where: {email: {_eq: $email}}) {
      id
    }
  }
`;

const GET_HEALTH_RECORDS = gql`
  query GetHealthRecords($citizenId: Int!) {
    health_records(where: {citizen_id: {_eq: $citizenId}}, order_by: {created_at: desc}) {
      id
      record_type
      record_description
      hospital_or_lab_name
      doctor_name
      visit_date
      additional_notes
      file_path
      created_at
    }
  }
`;

const ADD_HEALTH_RECORD = gql`
  mutation AddHealthRecord($input: health_records_insert_input!) {
    insert_health_records_one(object: $input) {
      id
    }
  }
`;

const UPDATE_HEALTH_RECORD = gql`
  mutation UpdateHealthRecord($id: Int!, $input: health_records_set_input!) {
    update_health_records_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
    }
  }
`;

const CardForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: null,
    record_type: '',
    record_description: '',
    hospital_or_lab_name: '',
    doctor_name: '',
    visit_date: '',
    additional_notes: '',
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: citizenData } = useQuery(GET_CITIZEN_ID, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  const { data: healthRecordsData, refetch: refetchHealthRecords } = useQuery(GET_HEALTH_RECORDS, {
    variables: { citizenId: citizenData?.citizens[0]?.id },
    skip: !citizenData?.citizens[0]?.id,
  });

  const [addHealthRecord] = useMutation(ADD_HEALTH_RECORD);
  const [updateHealthRecord] = useMutation(UPDATE_HEALTH_RECORD);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizenData?.citizens[0]?.id) {
      console.error('Citizen ID not found');
      return;
    }

    try {
      if (isEditing) {
        await updateHealthRecord({
          variables: {
            id: formData.id,
            input: {
              ...formData,
              file_path: previewUrl || formData.file_path,
            },
          },
        });
      } else {
        await addHealthRecord({
          variables: {
            input: {
              citizen_id: citizenData.citizens[0].id,
              ...formData,
              file_path: previewUrl,
            },
          },
        });
      }
      resetForm();
      refetchHealthRecords();
    } catch (error) {
      console.error('Error saving health record:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      record_type: '',
      record_description: '',
      hospital_or_lab_name: '',
      doctor_name: '',
      visit_date: '',
      additional_notes: '',
    });
    setFile(null);
    setPreviewUrl('');
    setIsEditing(false);
  };

  const handleEdit = (record) => {
    setFormData({
      id: record.id,
      record_type: record.record_type,
      record_description: record.record_description,
      hospital_or_lab_name: record.hospital_or_lab_name,
      doctor_name: record.doctor_name,
      visit_date: record.visit_date,
      additional_notes: record.additional_notes,
    });
    setPreviewUrl(record.file_path);
    setIsEditing(true);
  };

  const formFields = [
    { name: 'record_type', label: 'Record Type', type: 'text' },
    { name: 'record_description', label: 'Record Description', type: 'textarea' },
    { name: 'hospital_or_lab_name', label: 'Hospital/Lab Name', type: 'text' },
    { name: 'doctor_name', label: 'Doctor Name', type: 'text' },
    { name: 'visit_date', label: 'Visit Date', type: 'date' },
    { name: 'additional_notes', label: 'Additional Notes', type: 'textarea' },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl flex space-x-4">
        {/* Previous Submissions */}
        <div className="w-1/2 bg-white rounded-xl shadow-lg p-6 overflow-hidden">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Previous Submissions</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {healthRecordsData?.health_records.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-4 rounded-lg mb-4 shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-blue-600">{record.record_type}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(record)}
                      className="text-blue-500 hover:text-blue-600 transition duration-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(record.file_path)}
                      className="text-green-500 hover:text-green-600 transition duration-300"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600"><strong>Hospital/Lab:</strong> {record.hospital_or_lab_name}</p>
                <p className="text-sm text-gray-600"><strong>Doctor:</strong> {record.doctor_name}</p>
                <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(record.visit_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600"><strong>Description:</strong> {record.record_description}</p>
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {record.additional_notes}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="w-1/2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {isEditing ? 'Edit Health Record' : 'Add Health Record'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <motion.div key={field.name} whileHover={{ scale: 1.01 }} className="flex flex-col">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    rows="3"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                )}
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.01 }} className="flex flex-col">
              <label htmlFor="file" className="text-sm font-medium text-gray-700 mb-1">Upload File (Image only)</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </motion.div>
            {previewUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">File Preview:</h3>
                <div className="w-40 h-40 border border-gray-300 rounded-md overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            <div className="flex space-x-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                {isEditing ? 'Save Changes' : 'Submit Record'}
              </motion.button>
              {isEditing && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 flex items-center justify-center"
                >
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  Cancel
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Full size preview" className="max-w-full h-auto" />
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 mr-2" />
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardForm;