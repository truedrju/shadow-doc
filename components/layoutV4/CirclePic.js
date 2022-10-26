import Image from "next/image"
import { useScreenSize } from "../../utils/effects"

export default function CirclePic({ size, imageURL }) {
    let screenSize = useScreenSize()
    // unit sm is px
    // tailwail warning don't use dynamic value in className
    return (
        <div className={`relative align-self-center rounded-full overflow-hidden`} style={{ height: (screenSize != "large") ? `${size / 2}px` : `${size}px`, width: (screenSize != "large") ? `${size / 2}px` : `${size}px` }}>
            <Image src={imageURL || '/images/plum.png'}
                alt={imageURL} layout="fill" objectFit="cover" />
        </div>
    )

}