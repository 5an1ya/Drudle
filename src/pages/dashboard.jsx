import { useEffect, useState } from 'react';
import { View } from '@aws-amplify/ui-react';
import SignOutButton from '../components/signOutButton';
import GalleryView from '../components/galleryView';
import Logo from '../components/logo'

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

      <View display="flex" justifyContent="space-between" padding="10px">
        <Logo />
        <SignOutButton />
      </View>

      <View display="flex" padding="10px">
        <GalleryView plants={plants} />
      </View>

      
    </View>
  );
};

export default Dashboard;