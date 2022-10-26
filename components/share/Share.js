import { RWebShare } from "react-web-share"    
import { useRouter } from "next/router"

export default function Share({ title, text }) {
    let {asPath} = useRouter()
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''
    return (
        <RWebShare
            data={{
                title: title,
                text: text,
                url: hostname + asPath,
            }}
            onClick={() => console.log("shared successfully!")}
        >
            <button className="text-sm text-plum-grey2">Share 🔗</button>
        </RWebShare>
    )

}