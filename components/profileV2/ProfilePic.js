import Image from "next/image"
import { validImageURL } from "./util"

export default function ProfilePic({userImage, handleClick}) {
    return (
        <div onClick={handleClick} className={`relative w-8 h-8 align-self-center border-2 rounded-full overflow-hidden`}>
            <Image src={validImageURL(userImage) ? userImage : "/images/defaults_profile_1.png"} layout="fill" objectFit="cover" />
        </div>
    )
}