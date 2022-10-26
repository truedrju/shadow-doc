import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useState } from 'react'

import ProfilePic from './ProfilePic'
import PopoverAnimated from '../popover/Popover'
import { useLogout } from '../../usecases/user'

export default function ProfilePicSettings({ userName, picture }) {
    let [isOpen, setIsOpen] = useState()

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='flex flex-col justify-center'>
                <div onClick={() => setIsOpen(true)} className='flex flex-row justify-center cursor-pointer'>
                    <ProfilePic userImage={picture} />
                </div>
                <p className='text-xs text-emph3 text-center'>{userName}</p>
            </div>
            <ProfileTooltip isOpen={isOpen} handleClose={handleClose} />
        </>
    )
}

function ProfileTooltip({ isOpen, handleClose }) {
    let {
        handleLogout
    } = useLogout()
    let m = (
        <PopoverAnimated position={'top-10 right-32'} isOpen={isOpen} handleClose={handleClose}>
            <div className="fixed z-[200] bg-primary-black cursor-pointer text-center flex flex-row space-x-5 rounded-[15px] h-fit p-2 border border-white/[0.3]">
                {/* <div className='bg-[#2C2725]/[0.5] rounded-[15px] flex p-2' onClick={() => router.push("/playlists/user/settings")} >
                    <div className='relative h-[28px] w-[28px] flex'>
                        <Image src={"/images/setting.svg"} layout="fill" />
                    </div>
                </div> */}

                {/* <div className='bg-[#2C2725]/[0.5] rounded-[15px] flex p-2' onClick={() => handleLogout() && setIsOpen(true)}>
                    <div className='relative h-[28px] w-[28px] flex'>
                        <Image src={"/images/link.svg"} layout="fill" />
                    </div>
                </div> */}

                <div className='bg-[#DC6045]/[0.85] rounded-[15px] flex p-2' onClick={handleLogout}>
                    <div className='relative h-[28px] w-[28px] flex'>
                        <Image src={"/images/logout.svg"} layout="fill" />
                    </div>
                </div>
            </div>
        </PopoverAnimated>
    )

    if (typeof window == "undefined") {
        return null
    }

    const target = document && document.body
    return createPortal(m, target)
}