import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config.js";

class ConfService {

    client = new Client();
    database;
    bucket;


    constructor() {

        this.client
            .setEndpoint(config.appWriteEndPoint)
            .setProject(config.appWriteProjectId);
        
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create post

    async createPost ({ slug, userId, title, content, status, featuredImage }) {

        try {

            return await this.database.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug, 
                {
                    userId,
                    title,
                    content, 
                    status,
                    featuredImage,
                }
            )
        } catch (error) {

            console.log(`\nSomething went wrong while creating post !\nError: ${error}`);
        }
    }

    // update Post

    async updatePost (slug, { title, content, status, featuredImage }) {

        try {
            
            return await this.database.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug, 
                {
                    title, 
                    content, 
                    status, 
                    featuredImage,
                }
            )
        } catch (error) {
            
            console.log(`\nSomething went wrong while update post !\nError: ${error}`);
        }
    }

    // delete Post 

    async deletePost ( slug ) {

        try {
            
            await this.database.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
            );

            return true;
        } catch (error) {
            
            console.log(`\nSomething went wrong while delete post !\nError: ${error}`);
        }

    }

    // get Single Post 

    async getSinglePost ( slug ) {

        try {
            
            return await this.database.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            
            console.log(`\nSomething went wrong while getting single post !\nError: ${error}`);

            return false;
        }
    }

    // get All Post

    async getAllPost (query = [Query.equal("status", "active")]) {

        try {
            
            return await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                query,
            )
        } catch (error) {
            
            console.log(`\nSomething went wrong while fetching posts !\nError: ${error}`);

            return false;
        }
    }

    // upload File 

    async uploadFile ( file ) {

        try {
            
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            
            console.log(`\nSomething went wrong while file uploading !\nError: ${error}`);
        }
    }

    // delete File

    async deleteFile ( fileId ) {

        try {
            
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId,
            );

            return true;            
        } catch (error) {
            
            console.log(`\nSomething went wrong while deleting file !\nError: ${error}`);

            return false;
        }
    }   

    // file Preview

    filePreview ( fileId ) {

        return this.bucket.getFilePreview(
            config.appWriteBucketId,
            fileId,
        )
    }

    // create Comment On Post

    async createComment ({ userId, userName, commentContent, featuredImage }) {

        try {
            return await this.database.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCommentCollectionId,
                ID.unique(),
                {
                    userId,
                    userName,
                    commentContent,
                    featuredImage,
                }
            );
        } catch (error) {
            
            console.log(`\nSomething went wrong while create comment !\nError: ${error}`);
        }
    }

    // get All Comments On Post

    async getAllComments ({ featuredImage }) {


        try {
            
            // const query = Query.equal("featuredImage", featuredImage);

            // console.log(featuredImage, queries);

            return await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCommentCollectionId,
                [
                    Query.equal("featuredImage", featuredImage)
                ]
            );
        } catch (error) {
            
            console.log(`\nSomething went wrong while get comments on the post !\nError: ${error}`);
        }
    }

    // create Likes on Post

    async likePost ({ userId, userName, featuredImage }){

        try {
            
             // Check if the user has already liked the post
            const existingLike = await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteLikeCollectionId,
                [
                Query.equal("userId", userId),
                Query.equal("featuredImage", featuredImage),
                ]
            );

            if (existingLike.documents.length > 0) {
                // If the user has already liked the post, perform unlike (delete the like document)
                const likeDocumentId = existingLike.documents[0].$id;
                await this.database.deleteDocument(
                    config.appWriteDatabaseId,
                    config.appWriteLikeCollectionId,
                    likeDocumentId
                );
            }
            else {

                return await this.database.createDocument(
                    config.appWriteDatabaseId,
                    config.appWriteLikeCollectionId,
                    ID.unique(),
                    {
                        userId,
                        userName,
                        featuredImage,
                    }
                );
            }
        } catch (error) {
            
            console.log(`\nSomething went wrong while like on post !\nError: ${error}`);
        }
    }

    async getLikes ({ featuredImage }) {

        try {
            
            return await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteLikeCollectionId,
                [
                    Query.equal("featuredImage", featuredImage),
                ]
            )
        } catch (error) {
            
            console.log(`\nSomething went wrong while getting likes on post !\nError: ${error}`);
        }
    }
}

const confService = new ConfService();

export default confService;
