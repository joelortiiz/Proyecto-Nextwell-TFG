import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth, db} from '../firebase/firebaseConfig';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, setDoc } from 'firebase/firestore';


const provider = new GoogleAuthProvider();


export const useAddUser = () => {
    
    return(

      <>
  
    </>
  )
}
export default useAddUser