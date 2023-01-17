'use client'
import React from 'react'
import { toast } from 'react-toastify';
import ErrorFirebase from '../../components/errorFireBase';
import { storage, db } from '../../../../configFireBase'
import { ref,  uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";  

export default function ChangeImageProfile(props:any) {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const changeHandler = (e:any) => {
        const image = e.target.files[0];
        console.log(image.size)
        if(image != undefined){
            if (!image.type.match(imageMimeType)) {
                e.target.value = null
                return toast.error("Não é permitido armazenar este tipo de arquivo, escolha uma imagem.")
            }else if(image.size > 10000000){
                e.target.value = null
                return toast.error("Está imagem é muito grande, pode ter no maximo 10mb.")
            }
            DeletePhoto(image)
        } 
        e.target.value = null
    }
    
    function DeletePhoto(image:any){
        if(props.urlImages.nameWallPaper != "padrao.png"){
            const desertRef = ref(storage, 'ImageProfile/' + props.urlImages.nameProfile);
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
        const storageRef = ref(storage, "ImageProfile/" + referencesFile);
        uploadBytes(storageRef, image)
        .then((snapshot) => {
            getDownloadURL(ref(storage, 'ImageProfile/' + referencesFile))
            .then((url) => {
                props.setUrlImages({...props.urlImages, nameProfile: referencesFile, profile:url})
                UpdateBdUser({nameImageProfile:referencesFile, urlImageProfile:url})
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
            nameImage: dataImage.nameImageProfile,
            urlImage:dataImage.urlImageProfile
        })
    }

    return (
        
        <label  className='hidden group-hover:flex  absolute w-full h-full bg-black/40 top-[0] rounded-full justify-center items-center text-[20px] max-sm:text-[18px] backdrop-blur-[2px] cursor-pointer'>
            Trocar Foto
            <input  type="file" className='hidden' accept='.png, .jpg, .jpeg' onChange={changeHandler} />
        </label>
    )
}
