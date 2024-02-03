const config = {

    appWriteEndPoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appWriteLikeCollectionId: String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID),
}

export default config;