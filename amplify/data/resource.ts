import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Plant: a.model({
    plantId: a.id(),
    plantNickname: a.string(),
    scientificName: a.string(),
    birthdate: a.date(),
    tasks: a.string(),
    plantPhoto: a.string(), // URL or file path for the photo
  })
  .authorization((allow) => [allow.publicApiKey()]),

  Reminder: a.model({
    reminderId: a.id(),
    reminder: a.string(),
    plantId: a.id(),
    dueDate: a.date(),
    reminderType: a.enum(["WATER", "FERTILIZE", "PRUNE", "OTHER"]),
  })
  .authorization((allow) => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// Defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
