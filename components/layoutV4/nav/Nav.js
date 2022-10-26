import { useRouter } from "next/router"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { setIsMobileNavOpen } from "../../../store/helperSlice"
import Login from "../../login/UserConnect"
import { useScreenSize } from "../../../utils/effects"
import NavMobile from "./MobileNav"
import CirclePic from "../CirclePic"

export default function Nav() {
    let screen = useScreenSize() 
    let {isMobileNavOpen} = useSelector(s => s.helper)
    let dispatch = useDispatch()

    if (screen == "small" || screen == "super-small") {
        return (
            <div className='flex justify-between items-center m-3'>
                <NavMobile>
                    <div className='flex flex-col h-full mt-16 px-8'>
                        <Link href="/"> 
                            <div className='flex items-center space-x-3 cursor-pointer'>
                                <HomeBrandIcon />
                            </div>
                        </Link>

                        <div className="my-12 flex flex-col items-end text-lg space-y-6 cursor-pointer">
                            <Routes/>
                        </div>

                    </div>
                </NavMobile>
            <div className="flex justify-end space-x-3">
                <div onClick={() => isMobileNavOpen && dispatch(setIsMobileNavOpen(false))}>
                    <Login />
                </div>
            </div>
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center border-b border-plum-off-white">
                <Link href="/"> 
                    <div className='pl-12 flex items-center space-x-3 cursor-pointer'>
                        <HomeBrandIcon />
                    </div>
                </Link>

                <div className="flex justify-center text-sm md:text-base space-x-9 cursor-pointer">
                     <Routes/>
                </div>

                <div className="pr-12 flex justify-end space-x-3">
                    <Login />
                </div>
            </div>
        )
    }
}


function HomeBrandIcon() {
    let ss =  useScreenSize()
    let h=42
    if (ss == "super-small") {
        h=128
    }    

    return (
        <>
            <CirclePic imageURL={'/images/ssc.jpeg'} size={h} />
            <span className="text-sm font-bold">Shadow<span className="text-primary">Doc</span></span>
        </>
    )
}



const getClass = (pathname, href) => pathname == href ? "font-extrabold text-sm rounded-3xl py-2 px-6 bg-plum-purple text-sm " : "text-sm flex flex-col justify-center hover:opacity-60"

function Routes(){
    let {pathname} = useRouter()

    return (
        <>
            <Link href="/"><span className={getClass(pathname, "/")}>View</span></Link> 
            <Link href="/posts/create"><span className={getClass(pathname, "/posts/create")}>New</span></Link>
        </>
    )
}
// function Routes(){
//     let {pathname} = useRouter()
//     switch (pathname.split("/")[1]) {
//         case "playlists":
//             return (
//                 <>
//                     <Link href="/playlists/all"><span className={getClass(pathname, "/playlists/all")}>Explore</span></Link>
//                     <Link href="/playlists/create"><span className={getClass(pathname, "/playlists/create")}>Create a List</span></Link>
//                 </>
//             )
//         case "track":
//             return (
//                 <>
//                     <Link href="/track"><span className={getClass(pathname, "/track")}>Explore</span></Link>
//                     <Link href="/track/portfolio"><span className={getClass(pathname, "/track/portfolio")}>Portfolio</span></Link>
//                 </>
//             )
//         default:
//             return null
//     }
// }