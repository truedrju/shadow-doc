import {  useEffect, useState, useRef } from 'react'


function getScreenSize() {
  if (typeof window == "undefined") {
    getScreenSize()
  }
  const { innerWidth } = window
  if (innerWidth <= 400) {
    return "super-small"
  } else if (innerWidth <= 800 && innerWidth >= 400) {
    return "small"
  } else if(innerWidth > 800 && innerWidth <= 1000) {
    return "medium"
  } else if (innerWidth >1000) {
    return "large"
  } else {
    console.error("could not get screenSize for ", innerWidth)
  }
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState()
  
  useEffect(() => {
    setScreenSize(getScreenSize())
    const resize = () => setScreenSize(getScreenSize())
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return screenSize
}

export function outsideTrigger(onClickOutside) {
  let ref = useRef(null) 

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return ref
}