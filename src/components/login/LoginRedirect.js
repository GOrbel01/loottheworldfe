import { Component } from 'react';
import { ACCESS_TOKEN } from '../../index';
import {withParamsAndNavigate} from '../getParamsAndNavigate'
import { useState, useEffect  } from "react";
import { useMenuLoginHook } from './LoginProvider';

function LoginRedirect(props) {
    const { setAuthenticated } = useMenuLoginHook();

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let tTemp = props.location.search;
        var results = regex.exec(tTemp);
        console.log(results);
        let decoded = decodeURIComponent(results[1].replace(/\+/g, ' '));
        return results === null ? '' : decoded;
    }

    useEffect(() => {
        const token = getUrlParameter('token');
        // const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            setAuthenticated(true);
            return props.navigate("/home");
        } else {
            return props.navigate("/login");
        }
      });

      return (<div></div>)
}

export default withParamsAndNavigate(LoginRedirect)