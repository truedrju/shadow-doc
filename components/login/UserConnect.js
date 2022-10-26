import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoginModalOpen } from '../../store/helperSlice'
import LoginModal from './LoginModal'
import ProfilePicSettings from '../profileV2/ProfilePicSettings'
import PlumBtn from '../button/Button'


const Login = () => {
	const dispatch = useDispatch()
	let {user} = useSelector(state => state.user)
	if (user?.publicKey) return (
		<div className='space-y-2'>
			<ProfilePicSettings {...user} />	
		</div>
	) 

	return (
		<>
			<PlumBtn onClick={() => dispatch(setIsLoginModalOpen(true))} text="Login" type="secondary" />
			<LoginModal />
		</>

	)
}

export default Login