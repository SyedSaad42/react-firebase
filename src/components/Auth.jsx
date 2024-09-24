import { useState } from 'react' // as we are using the usestae we importing it from the react
import{auth, googleProvider} from '../config/firebase-config' // now we are importing whatever we imported from the firebase to the the firebase config to the auth compponent
// as you remember we imported the get auht and get google provider from the firebase in the firebaseconfig file
import {createUserWithEmailAndPassword,signInWithPopup, signOut} from 'firebase/auth' /// these are the feature we are directly importing from the firebase

export const Auth = () =>{ // this a component of our webisite
// 1. store the email ,2. is the method that updates the email 3.. is the initial current state of the variable email
 const[email,setEmail] = useState("");
 const[password, setPassword] = useState("");

 


 console.log(auth?.currentUser?.email);
// this is the method that will be invoked when the sign in button is clicked
    const SignIn = async ()=>{  // we use async function whenever we are using await.
        // we use try  and  catch block as if the promise from the await is rejected we can atleast handle it .

        try{
     await createUserWithEmailAndPassword(auth,email,password); // the await keyword allows the programme to stop running and make sure the method before which await 
     // is being used that method continue to run and wait for a promise from the fucntion wether is reejceted or responded
        }
        catch(err){
            console.error(err);
        }
    }

    const signInwithGoogle = async ()=>{
        try{
     await signInWithPopup(auth ,googleProvider)
        }
        catch(err){
            console.error(err);
        }
    }

    const logout = async ()=>{
        try{
     await signOut(auth )
        }
        catch(err){
            console.error(err);
        }
    }


    return( // this what will be rendered to teh web page
        <div>
            <input  placeholder="Email..." onChange={(e) =>{  // this the input for the email
                setEmail(e.target.value); // whatever is in ther the input email will be stored in setemail funciton which we introduced usingstatus hook
                // the change is considered as a event and that event is used in the setEmail to grab the event current value.
           }}/>
            
            
            <input type="password" onChange={(e) =>{  // this the input for the password.
                setPassword(e.target.value);
            }} placeholder="Password..." />
             
            <button onClick={SignIn}>Sign In</button> 
        
           
            <button onClick={signInwithGoogle}>Sign with Google</button>
            <button onClick={logout}>Logout</button> 

        </div>
    )
}
