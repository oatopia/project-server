import history from './history';
import jwt_decode from 'jwt-decode';

class Auth {
    url = "/api/user/";
    profile = {};

    signin = (data, error) => { // data consists of email and password
      if (!data) throw error({globalError: "no data for submission"})
      let option = {  
        method: 'POST', headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
      fetch (`${this.url}register`, option)
      .then(result => {
        if (result.ok) return result.json()
        else throw result;
      })
      .then(result => {
        if (result) {
            let {user} = result;
            localStorage.setItem('token', user.token);
            localStorage.setItem('id_token', user._id);
            let expiresAt = JSON.stringify((user.expiresIn * 1000 + new Date().getTime()))
            localStorage.setItem('expiresAt', expiresAt)
            this.profile = user
            setTimeout(() => { history.replace('/authcheck') }, 600);
      }})
      .catch(async err => {
        let msg = await err.json(); 
        error({globalError: msg.errors.global}) 
      })
    };

    getToken = (token) => localStorage.getItem(token)? localStorage.getItem(token): null;

    getProfile = async () => {
      let token = this.getToken('token');
      let id = this.getToken('id_token');

      try {
        let stripToken = token.split(' ')[1];
        let decoded = jwt_decode(stripToken);
        // token should contain the user basic info such as
        // _id: this._id, FName: this.FName, LName: this.LName, email: this.email, role: this.role
        if (id === decoded._id) {
          this.profile = decoded;
        } else {
          this.profile = null
        }
      } catch (err) { this.profile = null}
      return  this.profile;

      /*      let option = {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
      }
      if(token && id) {
        fetch (`${this.url}/user/${id}`, option)
        .then(result => {
          if(result && result.ok) 
              return result.json()   // result will be {user: {}}
            else throw result.json()
        })
        .then(user => {
          console.log("After request! ", user);
          this.profile = user
        })
        .catch(err => {console.log(err); this.profile = null})
      }
      else this.profile = null
      return this.profile
    */
    };

    signout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expiresAt')
      setTimeout(() => { history.push('/authcheck') }, 600);
    };

    isAuthenticated = () => {
      let expiresAt = JSON.parse(this.getToken('expiresAt'))
      return expiresAt && (new Date().getTime() < expiresAt)
    }
}

export default Auth;