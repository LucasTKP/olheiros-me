'use client'
import {auth, db }from '../../../configFireBase'
import 'react-toastify/dist/ReactToastify.css';
import ErrorFirebase from './errorFireBase'
import { doc, setDoc, getDoc} from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast  } from 'react-toastify';
import iconGoogle from '../../../public/icons/google.svg' 
import Image from 'next/image'

function GoogleProvider(){
  async function SignInGoogle() {
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      VerifyUser(user)
    }).catch((error) => {
      ErrorFirebase(error)
    });
  }
  
  async function VerifyUser(user:any){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      CreateUserDb({id: user.uid, name: user.email, email: user.email, password: "", provider: "Google"})
    }
  }

  async function CreateUserDb(props: any){
    await setDoc(doc(db, "users", props.id), {
        id: props.id,
        name: props.name,
        email: props.email,
        provider: props.provider,
        description:"Edite sua descrição",
        nameImage: "padrao.png",
        urlImage: "https://firebasestorage.googleapis.com/v0/b/olheiros-me.appspot.com/o/ImageProfile%2Fpadrao.jpg?alt=media&token=0c7a6d67-6118-407c-a2fe-1664dcbfcc4c",
        nameWallPaper: "padrao.png",
        urlWallPaper: "https://firebasestorage.googleapis.com/v0/b/olheiros-me.appspot.com/o/WallPapers%2Fpadrao.jpg?alt=media&token=4ffe0431-fcb9-4930-849d-6347008a349a",
        urlInstagram: "",
        urlTwitter: "",
        urlTwitch:"",

    });
    toast.success("Conta criada com sucesso!")
  }
  return(
    <div>
      <button type='button' onClick={() => SignInGoogle()}  className='gap-[10px] flex items-center justify-center text-[25px] max-lsm:text-[20px] bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px]'>
        Google
        <Image src={iconGoogle} alt="Logo Google" />
      </button>
    </div>
  )
}
  
      


export default GoogleProvider