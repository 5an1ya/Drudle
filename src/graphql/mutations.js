/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReminder = /* GraphQL */ `
  mutation CreateReminder($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const updateReminder = /* GraphQL */ `
  mutation UpdateReminder($input: UpdateReminderInput!) {
    updateReminder(input: $input) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const deleteReminder = /* GraphQL */ `
  mutation DeleteReminder($input: DeleteReminderInput!) {
    deleteReminder(input: $input) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const createPlant = /* GraphQL */ `
  mutation CreatePlant($input: CreatePlantInput!) {
    createPlant(input: $input) {
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
export const updatePlant = /* GraphQL */ `
  mutation UpdatePlant($input: UpdatePlantInput!) {
    updatePlant(input: $input) {
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
export const deletePlant = /* GraphQL */ `
  mutation DeletePlant($input: DeletePlantInput!) {
    deletePlant(input: $input) {
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
