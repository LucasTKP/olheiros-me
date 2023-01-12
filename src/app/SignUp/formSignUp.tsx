import React from 'react'
import Image from 'next/image'
import iconName from '../../../public/icons/name.svg' 
import iconEmail from '../../../public/icons/email.svg' 
import iconPassword from '../../../public/icons/password.svg' 
import iconTwitch from '../../../public/icons/twitch.svg' 
import iconGoogle from '../../../public/icons/google.svg' 

function FormSignUp() {
  return (
    <div className='text-[#D0CEF6] mt-[30px]'>
        <form className='flex flex-col'>
            <p className='text-[20px] mb-[5px]'>Apelido:</p>
            <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
                <input maxLength={25} type='text' placeholder="Digite seu nickname" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconName} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
            </label>

            <p className='text-[20px] mb-[5px] mt-[15px]'>Email:</p>
            <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
                <input maxLength={25} type='email' placeholder="Digite seu email" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconEmail} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
            </label>

            <p className='text-[20px] mb-[5px] mt-[15px]'>Senha:</p>
            <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
                <input maxLength={25} type='text' placeholder="Digite sua senha" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconPassword} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
            </label>
            <p className='self-end cursor-pointer'>Entrar como visitante</p>
            <div className='flex justify-center mt-[30px]'>
                <button type='submit'  className='flex items-center justify-center text-[25px]  bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px] max-lsm:text-[22px]' >Cadastrar</button>
            </div>
        </form>

        <div className='flex mt-[30px] justify-center items-center'>
            <div className='h-[4px] w-[45%] bg-terciary'/>
            <p className='px-[10px] text-[22px]'>ou</p>
            <div className='h-[4px] w-[45%] bg-terciary'/>
        </div>

        <div className='flex justify-between px-[20px] mt-[20px]'>
            <button type='submit'  className='gap-[10px] flex items-center justify-center text-[25px] max-lsm:text-[20px] bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px]'>
                Twich
                <Image src={iconTwitch} alt="Logo Twitch" />
            </button>

            <button type='submit'  className='gap-[10px] flex items-center justify-center text-[25px] max-lsm:text-[20px] bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px]'>
                Google
                <Image src={iconGoogle} alt="Logo Google" />
            </button>
        </div>
        <p className='text-[20px] text-center cursor-pointer pb-[20px] mt-[20px]'>Fazer Login</p>
    </div>
  )
}

export default FormSignUp