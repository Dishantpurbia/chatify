import React from 'react'
import { useauthstore } from '../store/useauthstore'

const chat = () => {

  const {loggedout} = useauthstore();

  return (
    <div onClick={loggedout} className='z-10 cursor-pointer'>
      chat
    </div>
  )
}

export default chat
