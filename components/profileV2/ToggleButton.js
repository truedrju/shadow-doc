import { useState } from "react"

export default function ToggleButton() {
    const [status, setStatus] = useState(false)
    return (
        <div className="flex justify-center w-fit cursor-pointer" onClick={() => setStatus(!status)}>
            <div className="relative">
                <div className="bg-[#2A2523] w-[112px] h-8 rounded-full" />
                <div className="absolute left-1 top-1 flex flex-row justify-between space-x-1">
                    <div className="rounded-full transition w-[50px] h-6 flex justify-center" style={{ "color": !status?"black":"white", "backgroundColor":!status?"#C4C4C4":"#2A2523" }}>
                        off
                    </div>
                    <div className="rounded-full transition w-[50px] h-6 flex justify-center"  style={{ "color": status?"black":"white", "backgroundColor":status?"#C4C4C4":"#2A2523" }}>
                        on
                    </div>
                </div>
            </div>
        </div>
    )
}
