import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect } from "react"
import { fadeInAnimation } from "../../styles/animations"

const PopoverAnimated = ({position, isOpen, handleClose, children}) => {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {isOpen && 
        <Popover position={position} handleClose={handleClose}>
          {children}
        </Popover>
      }
    </AnimatePresence>
  )
}

const Popover = ({ position, handleClose, children }) => {
  return (
    <Backdrop position={position} onClick={handleClose}>
        <motion.div
          className={`absolute ${position}`}
          onClick={(e) => e.stopPropagation()}
          {...fadeInAnimation}
        >
         
          {children}
        
        </motion.div>
    </Backdrop>
  )
}



const Backdrop = ({ position, children, onClick }) => {
  let ref = useRef(null) 

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <span ref={ref} className={`z-[10] rounded-xl py-3 text-div-grey ${position}`}>
      {children}
    </span>
  )
}

export default PopoverAnimated