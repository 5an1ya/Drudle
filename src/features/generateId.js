import { v4 as uuidv4 } from 'uuid';

// Function to generate unique plant ID
export const generatePlantId = () => `p-${uuidv4()}`;

// Function to generate unique reminder ID
export const generateReminderId = () => `r-${uuidv4()}`;