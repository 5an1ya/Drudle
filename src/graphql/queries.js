/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReminder = /* GraphQL */ `
  query GetReminder($id: ID!) {
    getReminder(id: $id) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: TableReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        notification
        type
        plantID
        dueDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlant = /* GraphQL */ `
  query GetPlant($plantId: ID!) {
    getPlant(plantId: $plantId) {
      plantId
      nickname
      scientificName
      birthdate
      reminders {
        id
        notification
        type
        plantID
        dueDate
        __typename
      }
      plantPhoto
      __typename
    }
  }
`;
export const listPlants = /* GraphQL */ `
  query ListPlants(
    $filter: TablePlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        plantId
        nickname
        scientificName
        birthdate
        plantPhoto
        __typename
      }
      nextToken
      __typename
    }
  }
`;
