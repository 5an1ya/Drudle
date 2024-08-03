import React, { useEffect, useState } from 'react';
import {
  Placeholder,
  ThemeProvider,
  Card,
  View,
  Flex,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import config from '../assets/aws-exports';
import { Amplify } from 'aws-amplify';
import AddPlantButton from './addPlantButton';

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(config);

// Define the theme for Placeholder
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

const client = generateClient({
  authMode: 'apiKey',
});

const GalleryView = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data: plantData, errors } = await client.models.Plant.list();
  
        console.log(plantData, errors);
  
        if (errors) {
          console.error("Error fetching plants:", errors);
        } else if (plantData) {
          setPlants(plantData.items || []); // Safely access items and default to an empty array if undefined
        } else {
          console.error("No plant data received");
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
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
    return (
      <NoPlantsPlaceholder />
    );
  }

  return (
    <div className="gallery-view">
      <div className="plant-gallery">
        {plants.map((plant) => (
          <div key={plant.plantId} className="plant-card">
            <img src={plant.plantPhoto} alt={plant.plantNickname} />
            <h3>{plant.plantNickname}</h3>
            <p>Scientific Name: {plant.scientificName}</p>
            <p>Age: {calculateAge(plant.birthdate)}</p>
            <p>Next Reminder: {getSoonestReminder(plant.reminders)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const calculateAge = (birthdate) => {
  if (!birthdate) return 'Unknown';
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getSoonestReminder = (reminders) => {
  if (!reminders || reminders.length === 0) return 'No reminders set';
  const sortedReminders = reminders.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
  return new Date(sortedReminders[0].dueDate).toLocaleDateString();
};

const NoPlantsPlaceholder = () => {
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
          <Text as="h2">You do not have any plants in your green house.</Text>
          <Text as="p">Add plants by clicking the button below!</Text>
          <AddPlantButton />
        </Flex>
      </Card>
    </View>
  );
};

export default GalleryView;
