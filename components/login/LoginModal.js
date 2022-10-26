import { useDispatch, useSelector } from "react-redux"
import { createPortal } from "react-dom"
import { setIsLoginModalOpen } from '../../store/helperSlice'
import LoginOpts from './LoginOpts'
import ModalAnimated from '../modalanimated/ModalAnimated'
import Loader from "../Loader"

export default function LoginModal() {
    const dispatch = useDispatch()
    let { isLoginModalOpen } = useSelector((state) => state.helper)
    let { userLoggingIn } = useSelector((state) => state.user)


    function closeModal() {
        isLoginModalOpen && dispatch(setIsLoginModalOpen(false))
    }

    let m = (
        isLoginModalOpen && 
        <ModalAnimated isOpen={isLoginModalOpen} handleClose={() => {
            closeModal()
        }}>
            {userLoggingIn ? <Loader text="Connecting.." /> : <LoginOpts handleClose={closeModal} />}
        </ModalAnimated>
    )

    if (typeof window == "undefined") {
        return null
    }

    const target = document && document.body
    return createPortal(m, target)
}