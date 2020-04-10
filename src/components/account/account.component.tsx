import React from 'react';
import { AccountProps } from './account.connector';
import { GoogleLogout } from 'react-google-login';
import { Auth } from '../../services/auth.service';

export class AccountComponent extends React.Component<AccountProps> {

    constructor(props:AccountProps) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <div className="col ctr account">
                <span>{this.props.user.first_name} {this.props.user.last_name}</span>
                <span>{this.props.user.mail}</span>
                <img className="user-img" src={this.props.user.image_url} alt="user imgae"/>
                <GoogleLogout clientId="235366402903-658ku15fjjjdnadc75k3ksvb68hvqbd7.apps.googleusercontent.com" 
                               buttonText="Logout" onLogoutSuccess={this.logout}>
                </GoogleLogout>
            </div>
        )
    }

    logout() {
        Auth.logout();
        this.props.logout();
    }
}