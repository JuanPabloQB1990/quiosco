import Image from 'next/image'
import React from 'react'
import Categoria from './Categoria'
import useQuiosco from '../hooks/useQuiosco'
import { QuioscoContext } from '../context/QuioscoProvider'

const Sidebar = () => {

    const {categorias} = useQuiosco(QuioscoContext)
  return (
    <>
      <Image width={300} priority height={100} src="/assets/img/logo.svg"/>
      <nav className='mt-10'>
        {categorias.map(categoria => (
            <Categoria key={categoria.id} categoria={categoria}/>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
