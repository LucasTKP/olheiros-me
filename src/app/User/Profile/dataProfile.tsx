import React, {useState} from 'react'
import Image from 'next/image'
import iconTwiter from '../../../../public/icons/twitter.svg'
import iconInstagram from '../../../../public/icons/instagram.svg'
import iconTwitch from '../../../../public/icons/twitch.svg'
import iconEdit from '../../../../public/icons/edit.svg'
import { auth }from '../../../../configFireBase'
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth"; 
import Link from 'next/link'

function dataProfile(props:any) {
    const router = useRouter()

    function Exit(){
        signOut(auth).then(() => {
            router.push('/SignUp')
        })
    }
  return (
    <div className='w-full max-md:w-[50%] max-sm:w-[65%] max-lsm:w-[80%] bg-terciary mt-[-30px] rounded-[8px] px-[5px] flex flex-col items-center relative'>
        <Image src={iconEdit} onClick={() => props.setModalEdit(true)} alt="Editar perfil" width={30} height={30}  className="absolute right-[5px] top-[5px]"/>
        <p className='mt-[40px] text-[25px] overflow-hidden whitespace-nowrap text-ellipsis max-w-[190px]'>{props.user.name}</p>
        <div className='w-[60%] h-[4px] bg-white'/>
        <div className='w-[80%] relativemt mt-[20px] relative'>
            <div className='absolute left-0 w-[15px] h-[15px] rounded-[2px] border-t-white border-t-[3px] border-l-white border-l-[3px]'/>
            <p className='text-[20px] font-[300] ml-[10px] text-center overflow-hidden whitespace-nowrap text-ellipsis'>{props.user.description}</p>
        </div>

        <div className='w-[80%] flex justify-between mt-[20px]'>
            <Link href={props.user.urlTwitter} target="_blank" className='hover:scale-105 duration-300  w-[50px] h-[50px] border-[2px] border-blue rounded-full bg-blue/30 flex justify-center items-center'>
                <Image src={iconTwiter} alt="Logo do twitter" width={30} height={30} />
            </Link>

            <Link href={props.user.urlInstagram} target="_blank" className='hover:scale-105 duration-300  w-[50px] h-[50px] border-[2px] border-red rounded-full bg-red/30 flex justify-center items-center'>
                <Image src={iconInstagram} alt="Logo do twitter" width={30} height={30} />
            </Link>

            <Link href={props.user.urlTwitter} target="_blank" className='hover:scale-105 duration-300  w-[50px] h-[50px] border-[2px] border-purple rounded-full bg-purple/50 flex justify-center items-center'>
                <Image src={iconTwitch} alt="Logo do twitter" width={25} height={30} />
            </Link>
        </div>

        <button type="button" onClick={() => Exit()} className="hover:scale-105 duration-300 text-[22px] bg-red/50 border-[2px] border-red rounded-[10px] px-[20px] mt-[25px] mb-[10px]">
        Sair
        </button>
    </div>
  )
}

export default dataProfile