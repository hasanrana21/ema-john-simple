import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
let history = useHistory();
let location = useLocation();
let { from } = location.state || { from: { pathname: "/shipment" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then(result =>{
      const {displayName, email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email
      }
      setUser(signedInUser);
    })
    
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleFbSignIn = () =>{
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
      console.log('fb user after sign in', user)

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  }

const handleSignedOut = () =>{
  // console.log('signOut Clicked');
  firebase.auth().signOut()
  .then(data => {
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
      error: '',
      success: false
    }
    setUser(signedOutUser);
  })
  .catch(err => {

  })
}

const handleBlur = (event) => {
  let isFormValid = true;
  if (event.target.name === 'email') {
    isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
  }
  
  if(event.target.name === 'password') {
    const isPasswordValid = event.target.value.length > 6;
    const passwordHasNumber = /\d{1}/.test(event.target.value);
    isFormValid = isPasswordValid && passwordHasNumber;
  }
  if(isFormValid) {
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success= true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success= true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info', res.user);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        setUser(newUserInfo);
      });
    }
}


const updateUserName = name =>{
  var user = firebase.auth().currentUser;

  user.updateProfile({
      displayName: name
    })
    .then( ()=> {
      // Update successful.
      console.log('user name updated successfully')
    })
    .catch( error => {
      // An error happened.
      console.log(error)
    });
}

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignedOut} style={{fontSize: '31px'}}>Sign Out</button>:
        <button onClick={handleSignIn} style={{fontSize: '31px'}}>Sign In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sign in Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }



      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign {newUser ? 'Up' : 'In'}</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />}
        <br/>
        <input type="email" placeholder="your email" name="email" onBlur={handleBlur} required/>
        <br/>
        <input type="password" name="password" placeholder="your password" onBlur={handleBlur} id="" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
      }
    </div>
  );
}

export default Login;
