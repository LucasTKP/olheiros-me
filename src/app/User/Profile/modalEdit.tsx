
import React, {useState} from 'react'
import Image from 'next/image'
import iconName from '../../../../public/icons/name.svg' 
import iconDescription from '../../../../public/icons/description.svg' 
import iconTwiter from '../../../../public/icons/twitter.svg'
import iconInstagram from '../../../../public/icons/instagram.svg'
import iconTwitch from '../../../../public/icons/twitch.svg'
import { db } from '../../../../configFireBase'
import { doc, updateDoc } from "firebase/firestore";  
import imageNetworkSocial from '../../../../public/images/networkSocial.png'

function ModalEdit(props:any) {
  const propsUser = props.user
  const [user, setUser] = useState({name:propsUser.name, description:propsUser.description, urlInstagram:propsUser.urlInstagram, urlTwitter:propsUser.urlTwitter, urlTwitch:propsUser.urlTwitch})
  
  async function UpdateBdUser(e: { preventDefault: () => void }){
    e.preventDefault()
    await updateDoc(doc(db, 'users', props.user.id), {
      name: user.name,
      description:user.description,
      urlInstagram: user.urlInstagram,
      urlTwitter: user.urlTwitter,
      urlTwitch:user.urlTwitch,
    })
    props.setUser({...props.user,       
      name: user.name,
      description:user.description,
      urlInstagram: user.urlInstagram,
      urlTwitter: user.urlTwitter,
      urlTwitch:user.urlTwitch
    })
    props.setModalEdit(false)
}

  return (

    <section className='text-white w-screen h-screen fixed bg-black/50 top-0 left-0 backdrop-blur-[6px] flex justify-center items-center z-50'>
      <div className='w-[400px] max-sm:w-[90%] pb-[20px] bg-[#a24ddf] rounded-[10px] relative flex flex-col'>
        <div onClick={() => props.setModalEdit(false)} className='cursor-pointer absolute top-[25px] right-[5px] z-50'>
          <div className='w-[40px] h-[4px] bg-white rounded-[2px] absolute rotate-45'></div>
          <div className='w-[40px] h-[4px] bg-white rounded-[2px] -rotate-45'></div>
        </div>
        <Image src={imageNetworkSocial} alt=""className='w-full h-full absolute z-[10] opacity-[.15]' />
        <form onSubmit={UpdateBdUser} className='w-full h-full px-[10px] mt-[20px] flex flex-col z-[20]'>
            <p className='text-[20px] mt-[5px]'>Apelido:</p>
            <label className='bg-terciary p-[5px] rounded-[8px] flex justify-between items-center'>
                <input required minLength={4} value={user.name} onChange={(text) => setUser({...user, name: text.target.value})} maxLength={20} type='text' placeholder="Digite seu apelido" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconName} priority alt="Icone usuário" className="w-[25px] h-[28px]"/>
            </label>

            <p className='text-[20px] mt-[5px]'>Descrição:</p>
            <label className='bg-terciary p-[5px] rounded-[8px] flex justify-between items-center'>
                <input required minLength={10} value={user.description} onChange={(text) => setUser({...user, description: text.target.value})} maxLength={70} type="text"  placeholder="Digite sua drecrição" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconDescription} priority alt="Icone chat" className="w-[25px] h-[28px]"/>
            </label>

            <p className='text-[20px] mt-[5px]'>Url Instagram:</p>
            <label className='bg-terciary p-[5px] rounded-[8px] flex justify-between items-center'>
                <input value={user.urlInstagram} onChange={(text) => setUser({...user, urlInstagram: text.target.value})} type="text"  placeholder="Digite a url do seu instagram" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconInstagram} priority alt="Icone Instagram" className="w-[25px] h-[25px]"/>
            </label>


            <p className='text-[20px] mt-[5px]'>Url Twitter:</p>
            <label className='bg-terciary p-[5px] rounded-[8px] flex justify-between items-center'>
                <input value={user.urlTwitter} onChange={(text) => setUser({...user, urlTwitter: text.target.value})} type="text"  placeholder="Digite a url do seu twitter" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconTwiter} priority alt="Icone Twitter" className="w-[25px] h-[25px]"/>
            </label>

            <p className='text-[20px] mt-[5px]'>Url Twitch:</p>
            <label className='bg-terciary p-[5px] rounded-[8px] flex justify-between items-center'>
                <input value={user.urlTwitch} onChange={(text) => setUser({...user, urlTwitch: text.target.value})} type="text"  placeholder="Digite a url da sua twitch" className='bg-transparent outline-none text-[20px] placeholder-[#D0CEF6] w-[90%]'/>
                <Image src={iconTwitch} priority alt="Icone Twitch" className="w-[25px] h-[25px]"/>
            </label>

            <button type="submit" className='bg-primary/50 border-[2px] hover:scale-105 border-white text-[20px] self-center mt-[20px] px-[15px] py-[5px] rounded-[8px]'>
              Salvar
            </button>
        </form>
      </div>
    </section>
  )
}

export default ModalEdit