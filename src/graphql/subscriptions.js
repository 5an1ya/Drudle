/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder(
    $id: ID
    $notification: String
    $type: AWSJSON
    $plantID: ID
    $dueDate: AWSDateTime
  ) {
    onCreateReminder(
      id: $id
      notification: $notification
      type: $type
      plantID: $plantID
      dueDate: $dueDate
    ) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder(
    $id: ID
    $notification: String
    $type: AWSJSON
    $plantID: ID
    $dueDate: AWSDateTime
  ) {
    onUpdateReminder(
      id: $id
      notification: $notification
      type: $type
      plantID: $plantID
      dueDate: $dueDate
    ) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const onDeleteReminder = /* GraphQL */ `
  subscription OnDeleteReminder(
    $id: ID
    $notification: String
    $type: AWSJSON
    $plantID: ID
    $dueDate: AWSDateTime
  ) {
    onDeleteReminder(
      id: $id
      notification: $notification
      type: $type
      plantID: $plantID
      dueDate: $dueDate
    ) {
      id
      notification
      type
      plantID
      dueDate
      __typename
    }
  }
`;
export const onCreatePlant = /* GraphQL */ `
  subscription OnCreatePlant(
    $plantId: ID
    $nickname: String
    $scientificName: String
    $birthdate: AWSDate
    $plantPhoto: String
  ) {
    onCreatePlant(
      plantId: $plantId
      nickname: $nickname
      scientificName: $scientificName
      birthdate: $birthdate
      plantPhoto: $plantPhoto
    ) {
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
export const onUpdatePlant = /* GraphQL */ `
  subscription OnUpdatePlant(
    $plantId: ID
    $nickname: String
    $scientificName: String
    $birthdate: AWSDate
    $plantPhoto: String
  ) {
    onUpdatePlant(
      plantId: $plantId
      nickname: $nickname
      scientificName: $scientificName
      birthdate: $birthdate
      plantPhoto: $plantPhoto
    ) {
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
export const onDeletePlant = /* GraphQL */ `
  subscription OnDeletePlant(
    $plantId: ID
    $nickname: String
    $scientificName: String
    $birthdate: AWSDate
    $plantPhoto: String
  ) {
    onDeletePlant(
      plantId: $plantId
      nickname: $nickname
      scientificName: $scientificName
      birthdate: $birthdate
      plantPhoto: $plantPhoto
    ) {
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
