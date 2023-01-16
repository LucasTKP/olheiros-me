'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { db }from '../../../../configFireBase'
import { getDoc, doc } from "firebase/firestore";
import Image from 'next/image'
import ChangeImage from './changeWallPaper';
import { toast } from 'react-toastify';

function page() {
  const params = useSearchParams()
  const id = params.get("id")
  const [urlImages, setUrlImages] = useState({nameProfile:"",  profile:"", nameWallPaper:"", wallPaper:""})

  useEffect(() => {
    async function GetWallImages(id:any){
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUrlImages({...urlImages, profile:docSnap.data().urlImage, nameWallPaper:docSnap.data().nameWallPaper, wallPaper:docSnap.data().urlWallPaper})
      } else {
          toast.error("Não foi possível carregar sua imagem de perfil.")
      }
    }
    GetWallImages(id)
  },[])

  return (
    <section className='w-full flex justify-center'>
      <div className='w-[80%] max-md:w-[95%]'>
        <div className='w-full h-[200px] rounded-[8px] bg-white relative'>
          {urlImages.wallPaper.length > 0 ? <Image src={urlImages.wallPaper} width={1800} height={200}  className='w-[100%] h-[200px] rounded-[8px] object-cover object-center' alt="Wallpaper do usuário"/> : "</>"}
          <ChangeImage setUrlImages={setUrlImages} urlImages={urlImages} id={id}/>
        </div>

      </div>
    </section>
  )
}

export default page