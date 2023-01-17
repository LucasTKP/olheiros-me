'use client'
import React from 'react'
import iconCamera from '../../../../public/icons/camera.svg'
import Image from 'next/image'
import { toast } from 'react-toastify';
import ErrorFirebase from '../../components/errorFireBase';
import { storage, db } from '../../../../configFireBase'
import { ref,  uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";  

function ChangeWallPaper(props:any) {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = (e:any) => {
      const image = e.target.files[0];
      if(image != undefined){
        if (!image.type.match(imageMimeType)) {
          e.target.value = null
          return toast.error("Não é permitido armazenar este tipo de arquivo, escolha uma imagem.")
        } else if(image.size > 10000000){
          e.target.value = null
          return toast.error("Está imagem é muito grande, pode ter no maximo 10mb.")
        }
        DeletePhoto(image)
      }
  }

  function DeletePhoto(image:any){
    if(props.urlImages.nameWallPaper != "padrao.png"){
      const desertRef = ref(storage, 'WallPapers/' + props.urlImages.nameWallPaper);
      deleteObject(desertRef)
      .then((result) => {
      })
      .catch((error) => {
        ErrorFirebase(error);
      });
    }
    toast.promise(UpdatePhoto(image), {pending: "Trocando plano de fundo", success:"Plano de fundo Trocado com sucesso", error:"Não foi possivel trocar o plano de fundo"});
  }

  async function UpdatePhoto(image:any){
    const referencesFile = Math.floor(Math.random() * 65536) + image.name;
    const storageRef = ref(storage, "WallPapers/" + referencesFile);
    uploadBytes(storageRef, image)
    .then((snapshot) => {
        getDownloadURL(ref(storage, 'WallPapers/' + referencesFile))
        .then((url) => {
            props.setUrlImages({...props.urlImages, nameWallPaper: referencesFile, wallPaper:url})
            UpdateBdUser({nameWallPaper:referencesFile, urlWallPaper:url})
        })
        .catch((error) => {
            ErrorFirebase(error);
        }); 
    })
    .catch((error) => {
        ErrorFirebase(error)
    });
  }

  async function UpdateBdUser(dataImage:any ){
    await updateDoc(doc(db, 'users', props.id), {
        nameWallPaper: dataImage.nameWallPaper,
        urlWallPaper:dataImage.urlWallPaper
    })
  }

  return (
    <label className='absolute w-[50px] max-sm:w-[40px]  h-[50px] max-sm:h-[40px] bg-black/50 rounded-full right-1 bottom-1 flex justify-center items-center '>
        <Image src={iconCamera} alt="Imagem de uma camera" className='w-[30px] max-sm:w-[25px]  h-[30px] max-sm:h-[25px] cursor-pointer'/>
        <input  type="file" className='hidden' accept='.png, .jpg, .jpeg' onChange={changeHandler} />
    </label>
  )
}

export default ChangeWallPaper