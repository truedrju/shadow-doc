import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { sideNavGradient } from '../../../consts'
import { sideBarAnimation } from '../../../styles/animations'
import { outsideTrigger } from '../../../utils/effects'
import { setIsMobileNavOpen } from '../../../store/helperSlice'


export default function NavMobile({children}) {
  let dispatch = useDispatch()
  let {isMobileNavOpen} = useSelector(s => s.helper)
  let ref = outsideTrigger(() => {
    isMobileNavOpen && dispatch(setIsMobileNavOpen(false))
  })

  const toggleMenu = () => {
    dispatch(setIsMobileNavOpen(!isMobileNavOpen))
  }

  return (
    <div className='' ref={ref}>
      <AnimatePresence>
        {isMobileNavOpen &&
          <motion.div
            // ref={ref}
            style={{background: sideNavGradient}}
            className={" absolute bottom-0 left-0 h-[100vh] z-40"}
            // onClick={() => setSideShowing(false)}
            {...sideBarAnimation}
          >            
              {children}
          </motion.div>
        }
      </AnimatePresence>
      
      <button className="absolute left-5 top-3 w-10 h-10 text-primary-light-gray sticky z-50" onClick={toggleMenu}>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {isMobileNavOpen ? <span aria-hidden="true" className="absolute block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out rotate-45" />
              : <span aria-hidden="true" className="absolute block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out -translate-y-1.5" />}
            {isMobileNavOpen ? <span aria-hidden="true" className="absolute block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out opacity-0" />
              : <span aria-hidden="true" className="absolute block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out" />}
            {isMobileNavOpen ? <span aria-hidden="true" className="block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out -rotate-45" />
              : <span aria-hidden="true" className="absolute block h-0.5 w-5 bg-current transform transition duration-400 ease-in-out translate-y-1.5" />}
          </div>
        </button>
    </div>

  )

}

// .sideNav {
//   display:flex;
//   flex-direction: column;
//   background-color: rgba(50, 45, 43, .9676);
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   height: 100vh;
//   z-index: 100;
//   width: 66.666667%;
//   justify-content: center;
//   padding: 3.236rem;
// }