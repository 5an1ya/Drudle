import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, View, Image } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface Plant {
  plantId: string;
  plantNickname: string;
  scientificName: string;
  birthdate: string;
  plantPhoto?: string; // Optional property
  reminders?: Reminder[];
}

interface Reminder {
  reminderId: string;
  reminder: string;
  dueDate: string;
  reminderType: 'WATER' | 'FERTILIZE' | 'PRUNE' | 'OTHER';
}

const PlantPage: React.FC = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!plantId) {
      // Redirect or handle error if plantId is not defined
      navigate('/'); // Example redirect to home
      return;
    }

    const fetchPlant = async () => {
      try {
        const response = await client.models.Plant.get({ id: plantId });
        const { data, errors } = response;

        if (errors) {
          console.error('Error fetching plant:', errors);
        } else {
          setPlant(data as Plant);
        }
      } catch (error) {
        console.error('Error fetching plant:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId, navigate]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!plant) {
    return <Text>Plant not found</Text>;
  }

  return (
    <View padding="10px">
      <Text fontSize="xl" fontWeight="bold">{plant.plantNickname}</Text>
      <Text>Scientific Name: {plant.scientificName}</Text>
      <Text>Birthdate: {new Date(plant.birthdate).toLocaleDateString()}</Text>
      {plant.plantPhoto ? (
        <Image
          src={plant.plantPhoto}
          alt={`Photo of ${plant.plantNickname}`}
          style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
        />
      ) : (
        <Text>No photo available</Text>
      )}
      <Text>Reminders:</Text>
      <View>
        {plant.reminders && plant.reminders.length > 0 ? (
          plant.reminders.map((reminder) => (
            <View key={reminder.reminderId} margin="10px 0">
              <Text>Task: {reminder.reminder}</Text>
              <Text>Type: {reminder.reminderType}</Text>
              <Text>Due Date: {new Date(reminder.dueDate).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text>No reminders available</Text>
        )}
      </View>
    </View>
  );
};

export default PlantPage;
