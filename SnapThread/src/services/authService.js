import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";


class AuthService {

    client = new Client;
    account;

    constructor () {

        this.client
            .setEndpoint(config.appWriteEndPoint)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    // create User Account

    async createAccount ( {userName, fullName, email, password} ) {

        try {
            
            const userAccount = await this.account.create(ID.unique(), email, password, userName, fullName);


            if (userAccount) {

                // return success message or return for continue as login.

                return await this.login({ email, password });
            }
            else  {

                // return information without login 
                return userAccount;
            }
        } catch (error) {
            
            throw error;
            console.log(`\nSomething went wrong while creating account !\nError: ${error}`);
        }
    }

    // login User Account

    async login ({ email, password }) {

        try {

            // handle user while login

            return await this.account.createEmailSession(email, password);
        } catch (error) {

            throw error;
            // console.log(`Something went wrong while login user !\nError: ${error}`);
        }
    }

    // get Current User

    async getCurrentUser () {

        try {

            // return info of current login user [they check whether user is login or not].

            return await this.account.get();
        } catch (error) {
            
            console.log(`Something went wrong while getting current user information !\nError: ${error}`);
        }

        return null;
    }

    // logout user 

    async logout () {

        try {

            // delete current login user session

            return await this.account.deleteSessions();
        } catch (error) {

            console.log(`\nSomething went wrong while logout user !\nError: ${error}`);
        }
    }

}

// create an object of the "AuthService" class 

const authService = new AuthService();

export default authService;