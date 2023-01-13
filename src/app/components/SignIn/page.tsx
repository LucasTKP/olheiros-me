'use client'
import React, {useState} from 'react'
import PersonSignIn from '../../../../public/images/PersonSignIn.png'
import Image from 'next/image'
import iconEmail from '../../../../public/icons/email.svg' 
import iconGoogle from '../../../../public/icons/google.svg' 
import iconEyeOn from '../../../../public/icons/eyeOn.svg' 
import iconEyeOff from '../../../../public/icons/eyeOff.svg' 

function page(props:any) {
  const [user, setUser] = useState({email:'', password:''})
  const [eye, setEye] = useState(false)
  return (
    <section className='text-white w-screen h-screen fixed bg-black/50 top-0 left-0 backdrop-blur-[6px] flex justify-center items-center'>
      <div className='w-[500px] max-sm:w-[90%] h-[620px] max-sm:h-[570px]  max-lsm:h-[550px] bg-[#7016B0] rounded-[10px] relative flex flex-col'>
        <div onClick={() => props.setSignIn(false)} className='cursor-pointer'>
          <div className='w-[40px] h-[4px] bg-white rounded-[2px] rotate-45 absolute top-[25px] right-[5px]'></div>
          <div className='w-[40px] h-[4px] bg-white rounded-[2px] -rotate-45 absolute top-[25px] right-[5px]'></div>
        </div>
        <Image src={PersonSignIn} alt={"Pessoa jogando."} className="w-[400px] h-[450px] max-sm:h-[400px] self-end bg-red"/>

        <div className='w-[94%] left-[3%]  absolute bg-white/30 bottom-[10px] rounded-[10px] backdrop-blur-[6px] px-[10px]'>
          <form onSubmit={console.log} autoComplete="off" className='flex flex-col'>
            <p className='text-[20px] mt-[5px]'>Email:</p>
            <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
                <input required onChange={(text) => setUser({...user, email: text.target.value})} maxLength={25} type='email' placeholder="Digite seu email" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconEmail} priority alt="Imagem de fundo" className="w-[30px] h-[33px] max-md:w-[27px] max-md:height-[29px] max-lsm:w-[25px] max-lsm:h-[27px]"/>
            </label>

            <p className='text-[20px] mt-[5px]'>Senha:</p>
            <label className='bg-terciary p-[10px] max-md:p-[8px] max-lsm:p-[5px] rounded-[8px] flex justify-between items-center'>
                <input required minLength={8} onChange={(text) => setUser({...user, password: text.target.value})} maxLength={25} type={eye ? "text" : 'password'}  placeholder="Digite sua senha" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image onClick={() => setEye(!eye)}  src={eye ? iconEyeOn : iconEyeOff} priority alt="Imagem de fundo" className="text-[20px]"/>
            </label>
            <p className='self-end cursor-pointer text-[20px] max-sm:text-[16px] text-white'>Esqueci a senha</p>
            <div className='flex justify-center mt-[5px]'>
                <button type='submit'  className='text-[25px] hover:scale-105 bg-primary rounded-[10px] px-[20px] py-[5px] max-md:text-[23px] max-lsm:text-[22px]'>Entrar</button>
            </div>
        </form>

          <div className='flex mt-[10px] justify-center items-center'>
            <div className='h-[4px] w-[45%] bg-terciary'/>
            <p className='px-[10px] text-[22px]'>ou</p>
            <div className='h-[4px] w-[45%] bg-terciary'/>
          </div>

          <div className='flex justify-between px-[20px] max-sm:px-[5px] mt-[5px] items-center pb-[10px]'>
            <button type='button'  className='hover:scale-105 gap-[10px] flex items-center justify-center text-[25px] max-lsm:text-[20px] bg-purple-800/50 border-purple-800 border-[2px] rounded-[10px] px-[10px] py-[5px] max-md:text-[23px]'>
              Google
              <Image src={iconGoogle} alt="Logo Google" />
            </button>
            <p className='text-[18px] leading-[20px] text-center cursor-pointer hover:scale-105'>Entrar como <br/> visitante</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default page