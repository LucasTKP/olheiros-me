'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { db }from '../../../../configFireBase'
import { getDoc, doc } from "firebase/firestore";
import Image from 'next/image'
import ChangeImage from './changeWallPaper';
import { toast, ToastContainer } from 'react-toastify';
import ChangeImageProfile from './changeImageProfile';
import DataProfile from './dataProfile';
import ModalEdit from './modalEdit'


function Page() {
  const params = useSearchParams()
  const id = params.get("id")
  const [urlImages, setUrlImages] = useState({nameProfile:"",  profile:"", nameWallPaper:"", wallPaper:""})
  const [user, setUser] = useState({id:id, name:"", description:"", urlInstagram:"", urlTwitter:"", urlTwitch:""})
  const [modalEdit, setModalEdit] = useState(false)

  useEffect(() => {
    GetWallImages(id)
  },[])

  async function GetWallImages(id:any){
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUrlImages({...urlImages, nameProfile:docSnap.data().nameImage, profile:docSnap.data().urlImage, nameWallPaper:docSnap.data().nameWallPaper, wallPaper:docSnap.data().urlWallPaper})
      setUser({...user, name:docSnap.data().name, description:docSnap.data().description, urlInstagram:docSnap.data().urlInstagram, urlTwitter:docSnap.data().urlTwitter, urlTwitch:docSnap.data().urlTwitch})
    } else {
        toast.error("Não foi possível carregar sua imagem de perfil.")
    }
  }


  return (
    <section className='w-full flex justify-center'>
      <ToastContainer autoClose={2000}/>
      {modalEdit ?  <ModalEdit setModalEdit={setModalEdit} user={user} setUser={setUser}/> : <></>}
      <div className='w-[80%] max-md:w-[95%]'>
        <div className='aspect-[16/3.3] max-sm:aspect-[12/3.3] max-lsm:aspect-[10/3.3] rounded-[8px] bg-primary relative border-[2px] border-white'>
          {urlImages.wallPaper.length > 0 ? <Image     width="0" height="0" sizes="100vw" priority src={urlImages.wallPaper} className='w-full h-full rounded-[8px]' alt="Wallpaper do usuário"/> : ""}
          <ChangeImage setUrlImages={setUrlImages} urlImages={urlImages} id={id}/>
        </div>
        <div className='w-[250px] max-md:w-[90%]  flex flex-col items-center'>
          <div className='z-20 group w-[180px] h-[180px] max-xl:w-[160px] max-xl:h-[160px] max-lg:w-[140px] max-lg:h-[140px] max-md:w-[120px] max-md:h-[120px] bg-primary border-[2px] border-white rounded-full mt-[-50px] relative cursor-pointer'>
            {urlImages.profile.length > 0 ? <Image width="0" height="0" sizes="100vw" src={urlImages.profile}  className='w-full h-full rounded-full' alt="Wallpaper do usuário"/> : ""}
            <ChangeImageProfile setUrlImages={setUrlImages} urlImages={urlImages} id={id} />
          </div>
          <DataProfile setModalEdit={setModalEdit} user={user} setUser={setUser}/>
        </div>
      </div>
    </section>
  )
}

export default Page