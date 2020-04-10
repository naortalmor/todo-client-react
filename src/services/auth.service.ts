import { User } from '../interfaces/user';
export class Auth {
    static getConnectedUser() {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user')!)
        } else {
            return undefined
        }
    }

    static saveUserOnCache(user:User):void {
        localStorage.setItem('user', JSON.stringify(user));
    }
}