const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABSE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    storageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
}
export default conf