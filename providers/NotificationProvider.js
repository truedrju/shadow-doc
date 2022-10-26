import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from "react-redux"
import { useEffect } from "react"

export default function UserProvider() {
  let {toastMsg} = useSelector((s) => s.helper)

  useEffect(() => {
    if (!toastMsg || !toastMsg.text) {
      return
    }
    switch (toastMsg.type) {
      case "success":
        toast.success(toastMsg.text)
        break
      case "error":
        toast.error(toastMsg.text)
        break
    
      default:
        toast(toastMsg.text)
        break
    }

  },[toastMsg])

  return (
    <>
      <ToastContainer autoClose={2856} theme="dark" />
    </>
  )
}