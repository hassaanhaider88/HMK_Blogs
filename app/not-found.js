import Image from 'next/image'
import React from 'react'

const notFound = () => {
  return (
    <div>
        <Image className='w-full h-screen' unoptimized src={"https://i.pinimg.com/originals/f3/56/3e/f3563e945aa9c7c37dccacf53ba603a0.gif"} width={100} height={100} />
    </div>
  )
}

export default notFound