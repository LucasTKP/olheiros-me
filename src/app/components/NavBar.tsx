'use client'
import React, { useEffect, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip';
import iconHome  from '../../../public/icons/home.svg'
import iconBinocular  from '../../../public/icons/binoculars.svg'
import Image from 'next/image'
import iconUser from '../../../public/icons/user.svg'
import { usePathname } from 'next/navigation'
import { auth, db }from '../../../configFireBase'
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import SignIn from '../components/SignIn/page'
import { signOut } from "firebase/auth"; 
import { getDoc, doc } from "firebase/firestore";
import Logo from '../../../public/icons/logo.svg'
import { toast } from 'react-toastify';

function NavBar() {
    const [menu, setMenu] = useState(false)
    const urlPage = usePathname()
    const router = useRouter()
    const [userAuth, setUserAuth] = useState(false)
    const [signIn, setSignIn] = useState(false)
    const [urlImage, setUrlImage] = useState("https://firebasestorage.googleapis.com/v0/b/olheiros-me.appspot.com/o/ImageProfile%2Fpadrao.jpg?alt=media&token=0c7a6d67-6118-407c-a2fe-1664dcbfcc4c")
    const [id, setId] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUserAuth(true)
              GetImage(user.uid)
            }
        });
    },[])

    async function GetImage(id:any){
        setId(id)
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUrlImage(docSnap.data().urlImage)
        } else {
            toast.error("Não foi possível carregar sua imagem de perfil.")
        }
    }

    function Exit(){
        signOut(auth).then(() => {
        router.push('/SignUp')
        }).catch((error) => {
        // An error happened.
        });
    }

  return (
    <section>
        <div className='flex items-center justify-center mt-[10px]'>
            <Image src={Logo} alt="Logo do olheiros"/>
            <p className='font-megrim text-[35px]'>lheiros-me</p>
        </div>
        {signIn ? <SignIn setSignIn={setSignIn}/> : <></>}
        <button onClick={() => setMenu(!menu)} className={`mt-[20px] z-40 absolute top-0 left-[40px] max-lg:left-[35px] max-md:left-[33px] max-sm:left-[30px] ${menu ? "py-[10px]" : ""}`} type='button'>
            <div className={`w-[40px] h-[4px] bg-white duration-500 rounded-[100px] ${menu ? "-rotate-45" : ""}`}/>
            <div className={`w-[40px] h-[4px] bg-white mt-[5px] duration-500 rounded-[100px] ${menu ? "hidden" : ""}`}/>
            <div className={`w-[40px] h-[4px] bg-white mt-[5px] duration-500 rounded-[100px] ${menu ? "rotate-45 mt-[-4px]" : ""}`} />
        </button>
        <div className={`w-[120px] max-lg:w-[110px]  max-md:w-[105px]  max-sm:w-[100px] h-screen flex-col fixed bg-terciary top-0 duration-500 flex items-center ${menu ? "left-0" : "left-[-150px]"}`}>
        <Tooltip.Provider>
            
            <Tooltip.Root>
                <Tooltip.Trigger asChild className={`cursor-pointer`}>
                    <Image src={urlImage} width={100} height={100} onClick={() => Exit()} className="w-[100px] h-[100px] max-lg:w-[90px] max-lg:h-[90px] max-md:w-[80px] max-md:h-[80px] max-sm:w-[70px] max-sm:h-[70px] bg-white mt-[70px] rounded-full" alt="Imagem de perfil"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Add to library</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root >
                <Tooltip.Trigger asChild className={`cursor-pointer mt-[30px]`}>
                    <div onClick={() => router.push('/')} className={`w-full h-[100px] max-lg:h-[95px] max-md:h-[90px]  max-sm:h-[85px] flex justify-center items-center ${urlPage === "/" ? "bg-[#7876AA]" : ""}`}>
                        <Image src={iconHome} className="w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px]  rounded-full" alt="Home"/>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Inicio</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild className='cursor-pointer'>
                    <Image src={iconBinocular} className="w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px] mt-[20px] rounded-full" alt="icone de busca"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Buscar</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root >
                <Tooltip.Trigger asChild className='cursor-pointer'>
                    <div className={`w-full h-[100px] max-lg:h-[95px] max-md:h-[90px]  max-sm:h-[85px] flex justify-center items-center ${urlPage === "/User/Profile" ? "bg-[#7876AA]" : ""}`}>
                        <Image onClick={() => userAuth ? router.push('/User/Profile?id=' + id) : setSignIn(true)} src={iconUser} className={`w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px] rounded-full`} alt="Icone de perfil"/>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Perfil</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

        </Tooltip.Provider>
        </div>
    </section>
  )
}

export default NavBar