import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Card, Text, Button, View } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import SearchBar from './searchBar';
import SortButton from './sortButton';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import AddPlantButton from './addPlantButton';

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface Plant {
  plantId: string;
  plantNickname: string;
  scientificName: string;
  birthdate: string;
  plantPhoto: string;
  reminders?: Reminder[]; // Make reminders optional
}

interface Reminder {
  reminderId: string;
  reminder: string;
  dueDate: string;
  reminderType: 'WATER' | 'FERTILIZE' | 'PRUNE' | 'OTHER';
  plantId: string;
}

const GalleryView: FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('name');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 3;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await client.models.Plant.list();
        const { data, errors } = response;

        if (errors) {
          console.error('Error fetching plants:', errors);
        } else if (Array.isArray(data)) {
          setPlants(data as Plant[]);
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

  const filteredPlants = plants
    .filter(plant =>
      plant.plantNickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.plantNickname.localeCompare(b.plantNickname);
      } else if (sortOption === 'age') {
        return calculateAge(a.birthdate) - calculateAge(b.birthdate);
      }
      return 0;
    });

  const visiblePlants = filteredPlants.slice(currentIndex, currentIndex + itemsPerPage);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (plants.length === 0) {
    return <Text>No plants available.</Text>;
  }

  const navigateToPlantPage = (plantId: string) => {
    navigate(`/plant/${plantId}`); // Use navigate to go to plant page
  };

  return (
    <View style={{ padding: '10px', margin: '0 auto' }}>
      <View display="flex" style={{ marginBottom: '10px', justifyContent: 'space-between' }}>
        <View display="flex">
          <SearchBar searchQuery={searchQuery} onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
          <SortButton sortOption={sortOption} onSortChange={(e: ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)} />
        </View>
        <AddPlantButton />
      </View>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={() => setCurrentIndex(Math.max(currentIndex - itemsPerPage, 0))} disabled={currentIndex === 0}>
          &lt;
        </Button>
        {visiblePlants.map((plant) => (
          <Card
            key={plant.plantId}
            onClick={() => navigateToPlantPage(plant.plantId)} // Navigate on click
            style={{ width: '350px', margin: '10px', cursor: 'pointer' }}
          >
            <StorageImage
              alt={`Photo of ${plant.plantNickname}`}
              path={plant.plantPhoto}
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            <Text fontWeight="bold">{plant.plantNickname}</Text>
            <Text>Scientific Name: {plant.scientificName}</Text>
            <Text>Age: {calculateAge(plant.birthdate)}</Text>
          </Card>
        ))}
        <Button onClick={() => setCurrentIndex(Math.min(currentIndex + itemsPerPage, filteredPlants.length - itemsPerPage))} disabled={currentIndex + itemsPerPage >= filteredPlants.length}>
          &gt;
        </Button>
      </View>
    </View>
  );
};

const calculateAge = (birthdate: string): number => {
  if (!birthdate) return 0;
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default GalleryView;
