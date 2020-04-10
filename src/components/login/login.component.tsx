import React from 'react';
import GoogleLogin from "react-google-login";
import axios, { AxiosResponse } from 'axios';
import { User } from '../../interfaces/user';
import { Auth } from '../../services/auth.service';
import { urlConfig } from '../../consts/config';

export class LoginComponent extends React.Component<{initUser: (user:User) => void}> {

    render() {
        return (
            <GoogleLogin clientId="235366402903-658ku15fjjjdnadc75k3ksvb68hvqbd7.apps.googleusercontent.com"
                             render={renderProps => (
                                <button className="button"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} >
                                    Log in with Google
                                </button>
                                )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle} />
        )
    }

    responseGoogle = (response:any) => {
        const id_token = response.getAuthResponse().id_token;
        axios.post<User>(`http://${urlConfig.url}:${urlConfig.port}/login/`, {token: id_token}).then((res:AxiosResponse<User>) => {
            Auth.saveUserOnCache(res.data);
            this.props.initUser(res.data);
        })
    };
}