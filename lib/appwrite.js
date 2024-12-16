import { Client } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.teakay.aora',
    projectId: '67600942003135f2dc99',
    databaseId: '67603b7d0023c647cb10',
    userCollectionId: '67603bb0003ac3397624',
    videoCollectionId: '67603bec001d4ae20f9c',
    storageId: '67604037001839243bfb'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
;