import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderSecondary = () => {

  const navigate = useNavigate();

  return (
    <header className='flex items-center py-5 border-b-1 gap-5'>
      <Icon icon="ion:arrow-back" onClick={() => navigate(-1)} />
      <p className='font-bold text-inherit'>China Gym</p>
    </header>
  )
}

export default HeaderSecondary
