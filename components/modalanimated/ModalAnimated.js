import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect } from "react"
import styles from "./modal-animated.module.css"
import { dropInAnimation } from "../../styles/animations"
import { useScreenSize } from "../../utils/effects"

const ModalAnimated = ({ isOpen, handleClose, children }) => {

    let modal
    if (isOpen) {
        modal = (
            <Backdrop key="HELPME" onClick={handleClose}>
                <motion.div
                    className={styles.modalContainer}
                    onClick={(e) => e.stopPropagation()}
                    {...dropInAnimation}
                >
                    {children}
                </motion.div>
            </Backdrop>
        )
    } else {
        modal = null
    }

    return (
        <AnimatePresence
            // Disable any initial animations on children that
            // are present when the component is first rendered
            // initial={false}
            // Only render one component at a time.
            // The exiting component will finish its exit
            // animation before entering component is rendered
            // exitBeforeEnter={true}
            // Fires when all exiting nodes have completed animating out
            // onExitComplete={() => null}
        >
            {modal}
        </AnimatePresence>
    )
}

// const Modal = ({ handleClose, children }) => {
//   return (

//   );
// };

const Backdrop = ({ children, onClick }) => {
    let ref = useRef(null)
    let screenSize = useScreenSize()

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick()
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        document.addEventListener("scroll", () => onClick())
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
            document.removeEventListener("scroll", () => onClick())
        }
    }, [])

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            className={styles.modalBackdrop}
            style={{
                opacity: 1,
                left: screenSize != "large" ? "12%" : "30%",
                right: screenSize != "large" ? "12%" : "30%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0  }}
        >
            {children}
        </motion.div>
    )
}

export default ModalAnimated
