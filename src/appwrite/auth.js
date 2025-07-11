import {Account,ID,Client} from 'appwrite'
import conf from '../conf/conf.js'


export class AuthService{
    client=new Client()
    acount;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        
        this.acount=new Account(this.client)
    }

    async CreateAcount({email,password,name}){
        try{
            const userAcount=await this.acount.create(ID.unique(),email,password,name)
            if(userAcount){
               return this.Login({email,password})
            }
        }
        catch(e){
            console.log('auth.js-CreateAcount-Error: ',e)
            throw error
        }
    }

    async Login({email,password}){
        try {
           return await this.acount.createEmailPasswordSession(email,password)

        } catch (error) {
            console.log('auth.js-Login-Error: ',error)
            throw error
        }
    }

    async GetCurrentUser(){
        try {
            return await this.acount.get()
        } catch (error) {
            console.log('auth.js-GetCurrentUser: ',error)
            throw error
        }
    }
    async Logout(){
        try {
            await this.acount.deleteSessions()
        } catch (error) {
            console.log('auth.js-Logout: ',error)
            throw error
        }
    }
    
}

const authService=new AuthService()
export default authService