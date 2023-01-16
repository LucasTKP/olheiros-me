import Image from 'next/image'
import BackgroundSignUp from '../../../public/images/backgroundSignUp.png'
import DetailsSignUp from '../../../public/images/detailsSignUp.png'
import Logo from '../../../public/icons/logo.svg'
import FormSignUp from './formSignUp'

export default function SignUp(){
    return (
        <section className="w-full min-h-screen h-full bg-primary flex max-xl:justify-center relative">
            <div className="w-[50%] h-full max-xl:w-[60%] max-lg:w-[80%] max-md:w-[100%] z-10">
                <Image src={DetailsSignUp} priority alt="Imagem de fundo" className="w-full h-[250px] max-xl:hidden"/>
                <Image src={Logo} priority alt="Imagem de fundo" className="w-[70px] max-md:w-[50px] h-[70px] max-md:h-[50px] absolute top-[10px] left-[20px]" />
                <div className="ml-[15%] mr-[10%] mt-[-150px] max-xl:mt-[40px] max-xl:mr-[0px] max-xl:ml-[0px] max-xl:px-[10%] max-sm:p-[20px]">
                    <h1 className="text-[80px] max-2xl:text-[75px] max-lg:text-[65px] max-md:text-[60px] max-sm:text-[55px] max-lsm:text-[50px] font-[600]">Bem vindo</h1>
                    <p className="text-[25px] max-lg:text-[23px] max-md:text-[21px] max-sm:text-[20px] max-lsm:text-[18px]">Faça seu cadastro e use o site sem nenhuma limitação.</p>
                    <FormSignUp />
                </div>
            </div>
            <Image src={BackgroundSignUp} priority alt="Imagem de fundo" className="w-[50%] min-h-screen h-screen max-xl:absolute max-xl:h-full max-xl:w-full max-xl:opacity-[15%]"/>
        </section>
    )
  }