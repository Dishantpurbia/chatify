import React from 'react'
import {LoaderIcon} from 'lucide-react'

function PageLoader() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <LoaderIcon className='size-10 animation-spin' />
    </div>
  )
}

export default PageLoader
