import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Plant: a.model({
    plantId: a.id(),
    plantNickname: a.string(),
    scientificName: a.string(),
    birthdate: a.date(),
    tasks: a.string(),
    plantPhoto: a.string(), // URL or file path for the photo
  })
  .authorization((allow) => [allow.publicApiKey()])
  .syncable(true)
  .pluralName("Plants")
  .key(a.key({ name: "byPlantId", fields: ["plantId"] })),

  Reminder: a.model({
    reminderId: a.id(),
    reminder: a.string(),
    plantId: a.id(),
    dueDate: a.date(),
    reminderType: a.enum(["WATER", "FERTILIZE", "PRUNE", "OTHER"]),
  })
  .authorization((allow) => [allow.publicApiKey()])
  .syncable(true)
  .pluralName("Reminders")
  .key(a.key({ name: "byReminderId", fields: ["reminderId"] }))
  .key(a.key({ name: "byPlantId", fields: ["plantId"] })),
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});