import React from "react";
import { View, Text, Button, Flex, Icon } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Mock data for plant details and reminders
const plantDetails = {
  nickname: "Sunny",
  scientificName: "Helianthus annuus", // Sunflower
  reminders: [
    { type: "Water", icon: "💧", notes: "Every 3 days" },
    { type: "Prune", icon: "✂️", notes: "Monthly" },
    { type: "Fertilize", icon: "🌿", notes: "Bi-weekly" },
    { type: "Other", icon: "🔔", notes: "Rotate pot weekly" },
  ],
};

const PlantPage = () => {
  return (
    <View padding="20px" maxWidth="800px" margin="auto">
      <Text as="h1" fontSize="2.5em" textAlign="center" marginBottom="20px">
        {plantDetails.nickname}
      </Text>
      <Text as="h2" fontSize="1.5em" textAlign="center" marginBottom="40px">
        {plantDetails.scientificName}
      </Text>

      <Flex direction="column" gap="20px">
        {plantDetails.reminders.map((reminder, index) => (
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

      <Button
        variation="primary"
        size="large"
        marginTop="40px"
        alignSelf="center"
        onClick={() => alert("Edit reminders")}
      >
        Edit Reminders
      </Button>
    </View>
  );
};

export default PlantPage;
