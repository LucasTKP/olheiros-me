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
        if (!image.type.match(imageMimeType)) {
          return toast.error("Não é permitido armazenar este tipo de arquivo, escolha uma imagem.")
        }
        DeletePhoto(image)
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
        UpdatePhoto(image);
    }

    function UpdatePhoto(image:any){
    const referencesFile = Math.floor(Math.random() * 65536) + image.name;
    const storageRef = ref(storage, "WallPapers/" + referencesFile);
    uploadBytes(storageRef, image)
    .then((snapshot) => {
        getDownloadURL(ref(storage, 'WallPapers/' + referencesFile))
        .then((url) => {
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

    async function UpdateBdUser(dataImage:any){
        await updateDoc(doc(db, 'users', props.id), {
            nameWallPaper: dataImage.nameWallPaper,
            urlWallPaper:dataImage.urlWallPaper
        })
        props.setUrlImages({...props.urlImages, nameWallPaper: dataImage.nameWallPaper, wallPaper:dataImage.urlWallPaper})
      }

  return (
    <label className='absolute w-[50px] h-[50px] bg-black/50 rounded-full right-1 bottom-1 flex justify-center items-center'>
        <Image src={iconCamera} alt="Imagem de uma camera" className='w-[30px] h-[30px]'/>
        <input  type="file" className='hidden' accept='.png, .jpg, .jpeg' onChange={changeHandler} />
    </label>
  )
}

export default ChangeWallPaper