'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import iconName from '../../../public/icons/name.svg' 
import iconEmail from '../../../public/icons/email.svg' 
import iconPassword from '../../../public/icons/password.svg' 
import {auth, db }from '../../../configFireBase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorFirebase from '../components/errorFireBase'
import { doc, setDoc, collection, query, where, getDocs  } from "firebase/firestore"; 
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import SignIn from '../components/SignIn/page'
import GoogleProvider from '../components/googleProvider'


function FormSignUp() {
  const [user, setUser] = useState({name: '', email:'', password:''})
  const [signIn, setSignIn] = useState(false)
  const router = useRouter()
  
  async function CreateUserAuth(e: { preventDefault: () => void }){
    e.preventDefault()
    const email = user.email
    const password = user.password
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let dataUser: any = undefined;
    querySnapshot.forEach((doc) => {
      dataUser = doc.data()
    });

    if(dataUser === undefined){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        CreateUserDb({id: userCredential.user.uid, name: user.name, email: email, password: password, provider: "Traditional"})
      })
      .catch((error) => {
        ErrorFirebase(error)
      });
    }  else {
      if(dataUser.provider === "Google"){
        return toast.error("Este email ja foi cadastrado utilizando o google como provedor.")
      } else {
        return toast.error("Este email ja foi cadastrado.")
      }
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

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push('/')
        }
      });
    },[auth, router])

  return (
    <div className='text-[#D0CEF6] mt-[30px]'>
      {signIn ? <SignIn setSignIn={setSignIn}/> : <></>}
      <ToastContainer autoClose={2000}/>
      <form onSubmit={CreateUserAuth} autoComplete="off" className='flex flex-col'>
          <p className='text-[20px] mb-[5px]'>Apelido:</p>
          <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
              <input required minLength={4} onChange={(text) => setUser({...user, name: text.target.value})} maxLength={25} type='text' placeholder="Digite seu nickname" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
              <Image src={iconName} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
          </label>

          <p className='text-[20px] mb-[5px] mt-[15px]'>Email:</p>
          <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
              <input required onChange={(text) => setUser({...user, email: text.target.value})} maxLength={25} type='email' placeholder="Digite seu email" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
              <Image src={iconEmail} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
          </label>

          <p className='text-[20px] mb-[5px] mt-[15px]'>Senha:</p>
          <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
              <input required minLength={8} onChange={(text) => setUser({...user, password: text.target.value})} maxLength={25} type='password' placeholder="Digite sua senha" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
              <Image src={iconPassword} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
          </label>
          <p onClick={() => router.push('/')} className='self-end cursor-pointer'>Entrar como visitante</p>
          <div className='flex justify-center mt-[30px]'>
              <button type='submit'  className='flex items-center justify-center text-[25px]  bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px] max-lsm:text-[22px]' >Cadastrar</button>
          </div>
      </form>

      <div className='flex mt-[30px] justify-center items-center'>
          <div className='h-[4px] w-[45%] bg-terciary'/>
          <p className='px-[10px] text-[22px]'>ou</p>
          <div className='h-[4px] w-[45%] bg-terciary'/>
      </div>

      <div className='flex justify-between px-[20px] mt-[20px] items-center pb-[20px]'>
          <GoogleProvider />
          <p onClick={() => setSignIn(true)} className='text-[20px] text-center cursor-pointer'>Fazer Login</p>
      </div>
    </div>
  )
}

export default FormSignUp