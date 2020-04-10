import { User } from './../../interfaces/user';

export interface AccountProps {
    user:User;
    logout: () => void
}