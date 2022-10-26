import Image from 'next/image'

import { getSocialAccount } from '../../usecases/UserSocial'

export default function SocialLinkItem({ socialMedia, handleLink }) {
    // const [u, setUser] = useState(userName);
    // const [showSubmit, setShowSubmit] = useState(false);
    let u = getSocialAccount(socialMedia)

    return (
        <div className="h-[50px] flex flex-row justify-between my-2">
            <Image src={"/images/hamburger.svg"} width={20} height={14} />
            <div className="flex flex-row self-center rounded-[15px] justify-between space-x-1 w-4/5" style={{ "backgroundColor": u && "#2C2725" }}>
                <div className='flex'>
                    <Image src={`/images/icon_${socialMedia}.svg`} width={20} height={14} />
                </div>
                {(u != "") ? <p className='m-auto text-[12px] pr-5 w-4/6'>{u}</p> :
                        <button className='grow w-[43px] my text-[10px] rounded-[15px] bg-plum-purple h-full' onClick={handleLink}>Link</button>
                    // <div className='flex grow justify-end'>
                    // </div>
                }
                {/* {u && <div className='flex cursor-pointer' onClick={() => {
                    // setShowSubmit(false)
                    setUser("")
                }}>
                    <Image src={"/images/cross.svg"} width={7} height={7} />
                </div>} */}
            </div>
        </div>
    )
}

