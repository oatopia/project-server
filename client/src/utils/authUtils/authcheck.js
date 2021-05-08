import React, { useEffect, useContext } from 'react';
import history from './history';
import Context from './Context';

const AuthCheck = (props) => {
  const context = useContext(Context)

  useEffect(() => {    
    if(context.authObj.isAuthenticated()) {
      context.handleUserLogin()
      context.handleUserAddProfile(context.authObj.profile)
      console.log("authcheck login ");
      history.replace('/')
    }
    else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      console.log("authcheck");
      
      setTimeout(() => { history.push('/') }, 600);
//      history.replace('/')
    }
  }, [])

  // Redirect to another page; don't need to show anything
  return <></>
}

export default AuthCheck;
