import Image from "next/image"
import { useLogin } from "../../usecases/user"

export default function LoginOpts() {

    let {
        handleMetaMask,
        handlePhantom
    } = useLogin()
    

    return (
        <div className="text-center">
            <h1 className="text-xl md:text-4xl mb-8 font-bold">
                Sign In To Continue
            </h1>
            <div className="space-y-3">
                <LoginOption handleSignIn={handleMetaMask} loginType="MetaMask" />
                <LoginOption handleSignIn={handlePhantom} loginType="Phantom" />
            </div>
        </div>
    )
}

function LoginOption({ handleSignIn, loginType }) {
    return (
        <div
            onClick={() => handleSignIn(loginType)}
            className="flex flex-row w-full py-4 bg-plum-purple-muted hover:bg-plum-purple px-6 cursor-pointer"
        >
            <div className="flex flex-row space-x-3">
                <div>
                    <Image
                        width={40}
                        height={40}
                        src={`/images/signin_${loginType}.png`}
                    />
                </div>
                <p className="my-auto">{loginType}</p>
            </div>
        </div>
    )
}
