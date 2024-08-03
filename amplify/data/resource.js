import { a, defineData, ClientSchema } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates database tables with fields. 
The authorization rule below specifies that any user authenticated via an 
API key can "create", "read", "update", and "delete" any "Todo" records.
=========================================================================*/
const schema = defineSchema({
  Plant: a
    .model({
      plantId: a.id().isRequired(),
      plantNickname: a.string().isRequired(),
      scientificName: a.string(),
      birthdate: a.date(),
      tasks: a.array(a.string()),
      plantPhoto: a.string(), // URL or file path for the photo
    })
    .authorization((allow) => [allow.publicApiKey()])
    .syncable(true)
    .pluralName("Plants")
    .key(a.key({ name: "byPlantId", fields: ["plantId"] })),

  Reminder: a
    .model({
      reminderId: a.id().isRequired(),
      reminder: a.string().isRequired(),
      plantId: a.id().isRequired(),
      dueDate: a.date().isRequired(),
      reminderType: a.enum(["WATER", "FERTILIZE", "PRUNE", "OTHER"]),
    })
    .authorization((allow) => [allow.publicApiKey()])
    .syncable(true)
    .pluralName("Reminders")
    .key(a.key({ name: "byReminderId", fields: ["reminderId"] }))
    .key(a.key({ name: "byPlantId", fields: ["plantId"] })),
});

export const Schema = ClientSchema;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)
Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { data } from '@/amplify/data/resource'; // Adjust the import path accordingly
const client = generateClient(data); // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
