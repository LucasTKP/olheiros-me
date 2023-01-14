import React, { useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip';
import iconSignOut  from '../../../public/icons/signOut.svg'
import iconHome  from '../../../public/icons/home.svg'
import iconBinocular  from '../../../public/icons/binoculars.svg'
import Image from 'next/image'
import iconUser from '../../../public/icons/user.svg'
import { usePathname } from 'next/navigation'

function NavBar() {
    const [menu, setMenu] = useState(false)
    const urlPage = usePathname()
  return (
    <section>
        <button onClick={() => setMenu(!menu)} className="mt-[20px] z-50 absolute left-[40px] max-lg:left-[35px] max-md:left-[33px] max-sm:left-[30px]" type='button'>
            <div className={`w-[40px] h-[4px] bg-white absolute duration-500  ${menu ? "-rotate-45" : ""}`}/>
            <div className={`w-[40px] h-[4px] bg-white absolute mt-[8px] duration-500 ${menu ? "hidden" : ""}`}/>
            <div className={`w-[40px] h-[4px] bg-white absolute mt-[16px] duration-500 ${menu ? "rotate-45 mt-[0px]" : ""}`} />
        </button>
        <div className={`w-[120px] max-lg:w-[110px]  max-md:w-[105px]  max-sm:w-[100px] h-screen flex-col fixed bg-terciary top-0 duration-500 flex items-center ${menu ? "left-0" : "left-[-150px]"}`}>
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild className={`cursor-pointer`}>
                    <Image src={""} className="w-[100px] h-[100px] max-lg:w-[90px] max-lg:h-[90px] max-md:w-[80px] max-md:h-[80px] max-sm:w-[70px] max-sm:h-[70px] bg-white mt-[50px] rounded-full" alt="Imagem de perfil"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Add to library</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root >
                <Tooltip.Trigger asChild className={`cursor-pointer mt-[30px]`}>
                    <div className={`w-full h-[100px] max-lg:h-[95px] max-md:h-[90px]  max-sm:h-[85px] flex justify-center items-center ${urlPage === "/" ? "bg-[#7876AA]" : ""}`}>
                        <Image src={iconHome} className="w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px]  rounded-full" alt="Home"/>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Inicio</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild className='cursor-pointer'>
                    <Image src={iconBinocular} className="w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px] mt-[20px] rounded-full" alt="icone de busca"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Buscar</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root >
                <Tooltip.Trigger asChild className='cursor-pointer'>
                    <Image src={iconUser} className="w-[70px] h-[70px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px] mt-[20px] rounded-full" alt="Icone de perfil"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Perfil</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild className='absolute bottom-5'>
                    <Image src={iconSignOut} className="w-[70px] h-[70px] mt-[50px] max-lg:w-[65px] max-lg:h-[65px] max-md:w-[60px] max-md:h-[60px] max-sm:w-[55px] max-sm:h-[55px] rounded-full" alt="icone de sair"/>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content  side="right" sideOffset={10}>
                        <p className='ml-[5px] mb-[6px] text-[20px]'>Sair</p>
                        <Tooltip.Arrow className="mr-[5px] fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>

        </Tooltip.Provider>
        </div>
    </section>
  )
}

export default NavBar