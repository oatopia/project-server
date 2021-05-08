import React, { useContext } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router';
import history from './authUtils/history';
import Context from './authUtils/Context';
import AuthCheck from './authUtils/authcheck';

// import HomePage from '../components/layout/HomePage';
// import Navigation from "../components/layout/Navigation";
// import Copyright from "../components/layout/Copyright";
// import SignIn from '../components/form/SignIn2';
// import SignUp from '../components/form/SignUp';
// import AddImgForm from '../components/form/AddImgForm';
// import GridListImages from '../components/subComponents/GridListImages2'
// import NotFoundPage from '../components/subComponents/NotFoundPage';
// import Profile from '../components/subComponents/Profile'
// import NeedSignin from '../components/subComponents/NeedSignin'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
  const context = useContext(Context)
  React.useEffect(() => {
    if (context.authObj && context.authObj.isAuthenticated() && !context.profileState) {
      context.authObj.getProfile()
//      .then(profile => profile)
      .then(profile => {
        console.log(profile);
        
        if (profile) context.handleUserResetProfile({is_authenticated: true, profile: profile})
      })
    }
  }, [])

    return(
      <div>
          <Router history={history} >
          <Navigation/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={()=><HomePage />} />

              <Route path='/authcheck' component={AuthCheck} />

              <Route path='/needSignin' component={NeedSignin} />
              <Route path='/signin' component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute path="/profile" 
                            component={Profile} 
                            redirectTo="/needSignin"
                            fromPage="/profile" />

              <PrivateRoute path='/likeImg'
                            component={GridListImages} 
                            redirectTo="/signin"
                            fromPage="/likeImg" />
              <PrivateRoute path="/addImg" component={AddImgForm} 
                                           redirectTo="/"
                                           requiredAdmin={true}
                                           fromPage="/addImg" />
{/*              <Route path="/addImg" component={AddImgForm} />
              <Route path="/profile" component={Profile} />
  */}
              <Route component={()=><NotFoundPage/>} />
            </Switch>
          </div>
        <hr />
        <Copyright/>
        </Router>
      </div>
  )}



export default Routes;
