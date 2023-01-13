'use client'
import { signOut } from "firebase/auth";
import { auth } from '../../configFireBase'

export default function Page(){
    function Exit(){
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    }
    return (
        <p onClick={() => Exit()} className="text-[50px] text-black font-poppins">Teste</p>
    )
  }