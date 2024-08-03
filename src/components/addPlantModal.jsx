import React, { useState } from 'react';
import { Button, TextField, Flex } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import { uploadData, getUrl } from 'aws-amplify/storage'; // Import Storage functions
import '../style.css';

const client = generateClient();

const AddPlantModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    plantNickname: '',
    scientificName: '',
    birthdate: '',
    plantPhoto: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = '';
      if (selectedFile) {
        // Upload the file to the storage
        const result = await uploadData({
          path: `images/${Date.now()}-${selectedFile.name}`, // Unique path with timestamp
          data: selectedFile,
          options: {
            contentType: selectedFile.type,
          },
        }).result;

        photoURL = await getUrl({ path: result.path });
      }

      const { errors, data: newPlant } = await client.models.Plant.create({
        ...formData,
        plantPhoto: photoURL,
      });

      if (errors) {
        console.error("Error creating plant:", errors);
      } else {
        console.log("Plant created successfully:", newPlant);
        onClose(); // Close the modal after submitting
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
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
            <TextField
              label="Plant Photo URL"
              name="plantPhoto"
              value={formData.plantPhoto}
              onChange={handleChange}
              disabled
            />
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <Button type="submit" variation="primary">Add Plant</Button>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default AddPlantModal;
