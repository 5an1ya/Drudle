***DRUDLE PROJECT STRUCTURE***

├── amplify/ # Folder containing Amplify backend configuration
│   ├── auth/ # Definition for auth backend
│   │   └── resource.tsx
│   ├── data/ # Definition for data backend
│   │   └── resource.ts
|   ├── backend.ts
│   └── package.json     
│   └── tsconfig.json
├── node_modules/ # Project dependencies
├── public/ 
├── src/ # React UI code
│   ├── App.tsx # UI code to sync todos in real-time
│   ├── index.css # Styling for your app
│   └── main.tsx # Entrypoint of the Amplify client library
├── amplify_outputs.json
├── package.json
└── tsconfig.json