import {Databases,Storage,Query,ID,Client} from 'appwrite'
import conf from '../conf/conf.js'
import { use } from 'react';

export class DBService{
    client=new Client()
    database;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)

        this.database= new Databases(this.client)
        this.storage= new Storage(this.client)
    }


    //post services
    async CreatePost({title,slug,content,attachimage,status,userId}){
        if(!title){
            console.log('config.js-CreatePost-Error: title is not providded')
            return false
        }
        if(!slug){
            console.log('config.js-CreatePost-Error: Slug is not provided, generating slug from title')
            return false 
        }
        if(!content){
            console.log('config.js-CreatePost-Error: Content is not provided')
            return false
        }
        if(!userId){
            console.log('config.js-CreatePost-Error: User ID is not provided')
            return false
        }
        if(!status){
            console.log('config.js-CreatePost-Error: Status is not provided, setting default status to active')
            status='active'
        }
        if(!attachimage){
            console.log('config.js-CreatePost-Error: AttachImage is not provided, setting default to null')
            attachimage=null
        }
        console.log('content',typeof content)
        console.log('title',typeof title)
        console.log('slug',typeof slug)
        console.log('attachimage',typeof attachimage)
        console.log('status',typeof status)
        console.log('userId',typeof userId)

    
        try {
            return await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,content,attachimage,status,userId
                }

            )
        } catch (error) {
            console.log('config.js-CreatePost-Error: ',error)
        }
    }
    async UpdatePost(slug,{title,content,attachimage,status}){
        try {
            console.log('config.js-UpdatePost: ',slug,title,content,attachimage,status)
            console.log('content',typeof content)
            return await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,content,attachimage,status
                }
            )
        } catch (error) {
            console.log('config.js-UpdatePost-Error: ',error)
        }
    }
    async DeletPost(slug){
        try {
             await this.database.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('config.js-DeletPost-Error: ',error)
            return false
        }
    }
    async GetPost(slug){
        try {
            return await this.database.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log('config.js-GetPost-Error: ',error)
        }
    }
    async GetPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log('config.js-GetPosts-Error: ',error)
            return false
        }
    }

    //File services
    async UploadFile(file){
        try {
            return await this.storage.createFile(
                conf.storageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('config.js-UploadFile-Error:',error)
            return false
        }
    }
    async DeletFile(file_ID){
        try {
            await this.storage.deleteFile(
                conf.storageId,
                file_ID
            )
            return true
        } catch (error) {
            console.log('config.js-DeletFile-Error: ',error)
            return false
        }
    }
    GetFilePrivew(file_Id){
        
        try {
            if(!file_Id){
                console.log('config.js-GetFilePrivew-Error: file_Id is not provided')
                return 
            }
            return this.storage.getFilePreview(
                conf.storageId,
                file_Id
            )
        } catch (error) {
            console.log('config.js-GetFilePrivew: ',error)
        }
    }
}
const dbService=new DBService()

export default dbService
