
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Empty() {
  return (
    <div className='text-center'>
      <ExclamationCircleIcon className='w-40 h-40 self-center mx-auto' />
      <h2 className='text-lg'>No hay elementos en la cesta de compra</h2>
    </div>
  )
}
