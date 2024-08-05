import React, { FC, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import type { Schema } from '../../amplify/data/resource';
import { Placeholder, ThemeProvider, Card, View, Flex, Text, useTheme } from '@aws-amplify/ui-react';
import AddPlantButton from './addPlantButton';
import { StorageImage } from '@aws-amplify/ui-react-storage';

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

const placeholderTheme = {
  name: 'placeholder-theme',
  tokens: {
    components: {
      placeholder: {
        transitionDuration: { value: '1250ms' },
        startColor: { value: '{colors.neutral.40}' },
        endColor: { value: '{colors.neutral.60}' },
        borderRadius: { value: '{radii.large}' },
        large: {
          height: { value: '{space.xxxl}' },
        },
      },
    },
  },
};

interface Plant {
  plantId: string;
  plantNickname: string;
  scientificName: string;
  birthdate: string;
  plantPhoto: string;
  reminders: Reminder[];
}

interface Reminder {
  reminderId: string;
  reminder: string;
  dueDate: string;
  reminderType: 'WATER' | 'FERTILIZE' | 'PRUNE' | 'OTHER';
}

const GalleryView: FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await client.models.Plant.list();
        const { data, errors } = response;

        if (errors) {
          console.error('Error fetching plants:', errors);
        } else if (Array.isArray(data)) {
          const transformedPlants = data.map(item => ({
            ...item,
            reminders: [] // Set reminders to an empty array if not fetched
          })) as Plant[];

          setPlants(transformedPlants);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={placeholderTheme} colorMode="light">
        <div style={{ textAlign: 'center' }}>
          <h2>Loading...</h2>
          <Placeholder size="large" />
        </div>
      </ThemeProvider>
    );
  }

  if (plants.length === 0) {
    return <NoPlantsPlaceholder />;
  }

  return (
    <div className="gallery-view">
      <div className="plant-gallery">
        {plants.map((plant) => (
          <div key={plant.plantId} className="plant-card">
            <StorageImage
              alt={`Photo of ${plant.plantNickname}`}
              path={plant.plantPhoto}
              onError={(error) => console.error(`Error loading image for ${plant.plantNickname}:`, error)}
              style={{ width: '200px', height: 'auto' }}
            />
            <h3>{plant.plantNickname}</h3>
            <p>Scientific Name: {plant.scientificName}</p>
            <p>Age: {calculateAge(plant.birthdate)}</p>
            <p>Next Reminder: {getSoonestReminder(plant.reminders)}</p>
          </div>
        ))}
        <AddPlantButton />
      </div>
    </div>
  );
};

const calculateAge = (birthdate: string): string => {
  if (!birthdate) return 'Unknown';
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age.toString();
};

const getSoonestReminder = (reminders: Reminder[]): string => {
  if (!reminders || reminders.length === 0) return 'No reminders set';
  const sortedReminders = reminders.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  return new Date(sortedReminders[0].dueDate).toLocaleDateString();
};

const NoPlantsPlaceholder: FC = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
      textAlign="center"
      width="75rem"
    >
      <Card>
        <Flex direction="column" alignItems="center">
          <Text as="h2">You do not have any plants in your greenhouse.</Text>
          <Text as="p">Add plants by clicking the button below!</Text>
          <AddPlantButton />
        </Flex>
      </Card>
    </View>
  );
};

export default GalleryView;
