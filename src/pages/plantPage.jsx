import React, { useState } from "react";
import { View, Text, Button, Flex, Icon, Image } from "@aws-amplify/ui-react";
import SignOutButton from "../components/signOutButton";
import "@aws-amplify/ui-react/styles.css";

// Mock data for plants
const initialPlants = [
  {
    id: 1,
    nickname: "Sunny",
    scientificName: "Helianthus annuus", // Sunflower
    reminders: [
      { type: "Water", icon: "💧", notes: "Every 3 days" },
      { type: "Prune", icon: "✂️", notes: "Monthly" },
      { type: "Fertilize", icon: "🌿", notes: "Bi-weekly" },
      { type: "Other", icon: "🔔", notes: "Rotate pot weekly" },
    ],
  },
  // Add more plants here as needed
];

const PlantPage = () => {
  const [plants, setPlants] = useState(initialPlants);

  const handleDeletePlant = (plantId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (confirmed) {
      // Filter out the plant to be deleted
      const updatedPlants = plants.filter((plant) => plant.id !== plantId);
      setPlants(updatedPlants);
    }
  };

  return (
    <View padding="20px" maxWidth="800px" margin="auto">
      <Flex justifyContent="flex-end" marginBottom="20px">
        <SignOutButton />
      </Flex>

      {plants.map((plant) => (
        <Flex
          key={plant.id}
          direction="row"
          alignItems="flex-start"
          gap="40px"
          marginBottom="40px"
        >
          <Image
            src="https://via.placeholder.com/250x350" // Placeholder image
            alt="Plant"
            width="250px"
            height="350px"
            objectFit="cover"
            style={{ marginTop: "20px" }}
          />
          <Flex direction="column" justifyContent="space-between" flex="1">
            <View>
              <Text as="h1" fontSize="2.5em" marginBottom="20px">
                {plant.nickname}
              </Text>
              <Text as="h2" fontSize="1.5em" marginBottom="20px">
                {plant.scientificName}
              </Text>
            </View>
            <Flex direction="column" gap="20px">
              {plant.reminders.map((reminder, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  padding="15px"
                  backgroundColor="#f5f5f5"
                  borderRadius="8px"
                  boxShadow="0 0 10px rgba(0,0,0,0.1)"
                >
                  <Flex alignItems="center">
                    <Icon as="span" fontSize="1.5em" marginRight="10px">
                      {reminder.icon}
                    </Icon>
                    <Text fontSize="1.2em">{reminder.type}</Text>
                  </Flex>
                  <Text fontSize="1em">{reminder.notes}</Text>
                </Flex>
              ))}
            </Flex>
            <Flex
              direction="row"
              gap="20px"
              justifyContent="center"
              marginTop="40px"
            >
              <Button
                variation="primary"
                size="large"
                onClick={() => alert("Add Task")}
              >
                Add Task
              </Button>
              <Button
                variation="primary"
                size="large"
                onClick={() => alert("Edit Reminders")}
              >
                Edit Reminders
              </Button>
              <Button
                variation="destructive"
                size="large"
                onClick={() => handleDeletePlant(plant.id)}
              >
                Delete Plant
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </View>
  );
};

export default PlantPage;
