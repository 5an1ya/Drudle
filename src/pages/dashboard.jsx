import { useEffect, useState } from 'react';
import { View } from '@aws-amplify/ui-react';
import SignOutButton from '../components/signOutButton';
import GalleryView from '../components/galleryView';
import AddPlant from '../components/addPlantButton';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Fetch plants, suggestions, and tasks from an API or local storage
    // setPlants(fetchedPlants);
    // setSuggestions(fetchedSuggestions);
    // setTasks(fetchedTasks);
  }, []);

  return (
    <View>
      <GalleryView plants={plants} />
      <AddPlant />
      <SignOutButton />
    </View>
  );
};

export default Dashboard;