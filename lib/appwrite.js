import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

// Define your configuration object
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.teakay.aora',
    projectId: '67600942003135f2dc99',
    databaseId: '67603b7d0023c647cb10',
    userCollectionId: '67603bb0003ac3397624',
    videoCollectionId: '67603bec001d4ae20f9c',
    storageId: '67604037001839243bfb'
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const logoutAllSessions = async () => {
    try {
        const sessions = await account.listSessions();
        const currentSession = await account.getSession('current');

        for (const session of sessions.sessions) {
            if (session.$id !== currentSession.$id) {
                await account.deleteSession(session.$id);
            }
        }
        return true;
    } catch (error) {
        console.error('Error logging out sessions:', error.message);
        throw new Error('Failed to logout all sessions');
    }
};

export const signIn = async (email, password) => {
    try {
        await logoutAllSessions();
        const session = await account.createEmailPasswordSession(email, password);
        
        // Create a persistent session
        await account.createPersistentSession();
        
        return session;
    } catch (error) {
        console.error('Error signing in:', error.message);
        throw new Error('Failed to sign in: ' + error.message);
    }
};

export const signOut = async () => {
    try {
        const currentSession = await account.getSession('current');
        if (currentSession) {
            await account.deleteSession(currentSession.$id);
        }
        return true;
    } catch (error) {
        console.error('Error signing out:', error.message);
        throw new Error('Failed to sign out');
    }
};

export const createUser = async (email, password, username) => {
    try {
        if (!email || !password || !username) {
            throw new Error('Email, password, and username are required');
        }

        await logoutAllSessions();

        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Failed to create account');

        const avatarUrl = avatars.getInitials(username);
        
        const session = await signIn(email, password);
        if (!session) throw new Error('Failed to sign in after account creation');

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        );

        return newUser;
    } catch (error) {
        throw new Error('User creation failed: ' + error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) return null;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) return null;
        return currentUser.documents[0];
    } catch (error) {
        console.error('Error getting current user:', error.message);
        return null;
    }
};


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt') // Optional: sort by creation date
            ]
        );

        console.log('Posts from Appwrite:', posts.documents); // Debug log
        return posts.documents;
    } catch (error) {
        console.error('Error in getAllPosts:', error); // Debug log
        throw error;
    }
};

export const getAvatar = (username) => {
    return avatars.getInitials(username).toString();
  };

  export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7) // Correct placement of Query.limit
            ]
        );
        console.log('Posts from Appwrite:', posts.documents); // Debug log
        return posts.documents;
    } catch (error) {
        console.error('Error in getAllPosts:', error); // Debug log
        throw error;
    }
};