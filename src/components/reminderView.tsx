import React, { useEffect, useState } from 'react';
import { View, Text, Flex } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

interface Reminder {
  reminderId: string;
  reminder: string;
  dueDate: string;
  reminderType: 'WATER' | 'FERTILIZE' | 'PRUNE' | 'OTHER';
  plantId: string;
}

const ReminderView: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await client.models.Reminder.list();
        const { data, errors } = response;

        if (errors) {
          console.error('Error fetching reminders:', errors);
        } else if (Array.isArray(data)) {
          const sortedReminders = (data as Reminder[]).sort(
            (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          );
          setReminders(sortedReminders.slice(0, 10));
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (reminders.length === 0) {
    return <Text>No reminders available.</Text>;
  }

  return (
    <View padding="10px">
      <Text fontSize="xl" fontWeight="bold">Upcoming Reminders</Text>
      {reminders.map((reminder) => (
        <Flex key={reminder.reminderId} direction="column" margin="10px 0">
          <Text>Task: {reminder.reminder}</Text>
          <Text>Type: {reminder.reminderType}</Text>
          <Text>Due Date: {new Date(reminder.dueDate).toLocaleDateString()}</Text>
          <Text>Plant ID: {reminder.plantId}</Text>
        </Flex>
      ))}
    </View>
  );
};

export default ReminderView;
