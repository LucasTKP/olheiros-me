'use client'
import { signOut } from "firebase/auth";
import { auth } from '../../configFireBase'
import NavBar from './components/NavBar'

export default function Page(){
    function Exit(){
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    }
    return (
        <NavBar />
    )
  }