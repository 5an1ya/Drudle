import { useEffect, useState } from 'react';
import { View } from '@aws-amplify/ui-react';
import SignOutButton from '../components/signOutButton';
import GalleryView from '../components/galleryView';
import ReminderView from '../components/reminderView'
import Logo from '../components/logo';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [reminders, setReminder] = useState([]);

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

      <View
        display="flex"
        flexDirection="column"
        padding="10px"
        style={{ overflow: 'hidden', maxHeight: '100rem', maxWidth: '75rem' }}
      >
        <GalleryView plants={plants} />
        <ReminderView reminders={reminders} />
      </View>
    </View>
  );
};

export default Dashboard;
