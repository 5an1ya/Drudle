import { defineData } from '@aws-amplify/backend';

const schema = {
  models: {
    Plant: {
      name: "Plant",
      fields: {
        plantId: {
          name: "plantId",
          type: "ID",
          isRequired: true,
        },
        plantNickname: {
          name: "plantNickname",
          type: "String",
          isRequired: true,
        },
        scientificName: {
          name: "scientificName",
          type: "String",
        },
        birthdate: {
          name: "birthdate",
          type: "AWSDate",
        },
        tasks: {
          name: "tasks",
          type: "[String]",
        },
        plantPhoto: {
          name: "plantPhoto",
          type: "String", // URL or file path for the photo
        },
      },
      syncable: true,
      pluralName: "Plants",
      attributes: [
        {
          type: "model",
        },
        {
          type: "key",
          properties: {
            name: "byPlantId",
            fields: ["plantId"],
          },
        },
      ],
    },
    Reminder: {
      name: "Reminder",
      fields: {
        reminderId: {
          name: "reminderId",
          type: "ID",
          isRequired: true,
        },
        reminder: {
          name: "reminder",
          type: "String",
          isRequired: true,
        },
        plantId: {
          name: "plantId",
          type: "ID",
          isRequired: true,
        },
        dueDate: {
          name: "dueDate",
          type: "AWSDate",
          isRequired: true,
        },
        reminderType: {
          name: "reminderType",
          type: {
            enum: "ReminderType",
            values: ["WATER", "FERTILIZE", "PRUNE", "OTHER"],
          },
        },
      },
      syncable: true,
      pluralName: "Reminders",
      attributes: [
        {
          type: "model",
        },
        {
          type: "key",
          properties: {
            name: "byReminderId",
            fields: ["reminderId"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byPlantId",
            fields: ["plantId"],
          },
        },
      ],
    },
  },
  enums: {
    ReminderType: {
      name: "ReminderType",
      values: ["WATER", "FERTILIZE", "PRUNE", "OTHER"],
    },
  },
  nonModels: {},
  version: "1.0",
};

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});