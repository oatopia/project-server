import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router';
import Context from './authUtils/Context'

const PrivateRoute = ({component: ComposedComponent, redirectTo, requiredAdmin=false, fromPage, ...rest }) => {
  const context = useContext(Context);
  let isAuthenticated = context.authObj.isAuthenticated()
  let isAdmin = context.profileState && context.profileState.role === 'admin';
  isAdmin = isAdmin===null? false: isAdmin;

  class Authentication extends React.Component { 
      // Redirect if not authenticated; otherwise, return the component inputted into <PrivateRoute /> 
      handleRender = props => {
        if (isAuthenticated && (isAdmin || (isAdmin == requiredAdmin)))
          return <ComposedComponent {...props}/>
        else
          return <Redirect to={{pathname: redirectTo, state: { from: fromPage }}} />
      }

      render() {
        return (
          <Route {...rest} render={this.handleRender}/>
        );
      }
  }

  return <Authentication/>
}

export default PrivateRoute
