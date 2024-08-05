import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Flex } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { generatePlantId } from '../features/generateId';
import type { Schema } from '../../amplify/data/resource';
import '../style.css';
import '@aws-amplify/ui-react/styles.css'; // Import Amplify UI styles

// Define the client type and configure it
const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  plantNickname: string;
  scientificName: string;
  birthdate: string;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    plantNickname: '',
    scientificName: '',
    birthdate: '',
  });

  const [fileKey, setFileKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSuccess = ({ key }: { key?: string }) => {
    if (key) {
      setFileKey(key);
      console.log('File uploaded successfully. Key:', key);
    } else {
      console.error("Upload was successful, but no key was returned.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Generate a unique plant ID
      const plantId = generatePlantId();
  
      // Create a new plant record with the generated ID
      await client.models.Plant.create({
        id: plantId,
      });
  
      console.log("Plant created successfully with ID:", plantId);
  
      if (fileKey) {
        // Attempt to update the plant record with the file key and other information
        try {
          const { data: updatedPlant, errors } = await client.models.Plant.update({
            id: plantId,
            plantPhoto: fileKey,
            plantNickname: formData.plantNickname,
            scientificName: formData.scientificName,
            birthdate: formData.birthdate,
          });
  
          if (errors && errors.length > 0) {
            errors.forEach(err => {
              console.error("Error updating plant:", err);
              console.error("Error Type:", err.errorType);
              console.error("Error Message:", err.message);
            });
            setLoading(false);
            return;
          }
  
          console.log("Plant updated successfully:", updatedPlant);
        } catch (updateError) {
          console.error("Error updating plant:", updateError);
          // Additional logging or handling as needed
        }
      }
  
      onClose(); // Close the modal after submitting
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error handling the plant submission:", error);
      // Log full error details
      if (Array.isArray(error)) {
        error.forEach(err => console.error(err));
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="small">
            <TextField
              label="Plant Nickname"
              name="plantNickname"
              value={formData.plantNickname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Scientific Name"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleChange}
            />
            <TextField
              label="Birthdate"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
            <StorageManager
              acceptedFileTypes={['image/*']}
              path={({ identityId }) => `protected/${identityId}/`}
              maxFileCount={1}
              isResumable
              onUploadSuccess={handleFileSuccess}
            />
            <Button type="submit" variation="primary" isLoading={loading}>Add Plant</Button>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default AddPlantModal;
