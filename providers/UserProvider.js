import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { get200 } from "../services/request"
import { setUser } from "../store/userSlice"

export default function UserProvider() {
    let dispatch = useDispatch()

    useEffect(() => {
        async function setUserData() {
            let user = await get200("/api/user")
            if (user?.user) {
                dispatch(setUser(user.user))
            }
        }

        setUserData().catch(console.error)
    }, [])

    return null
}
