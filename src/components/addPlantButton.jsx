import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import AddPlantModal from './addPlantModal.tsx'; // Adjust import path as needed

const AddPlantButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-plant">
      <Button onClick={handleOpenModal}>Add Plant</Button>
      <AddPlantModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AddPlantButton;
