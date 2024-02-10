import Image from 'next/image';
import React from 'react'

const Orden = ({orden}) => {
    console.log(orden);

    const { id, nombre, total, pedido } = orden

  return (
    <div className='border p-10 space-y-5'>
      <h1 className='text-4xl font-black'>Orden: {id}</h1>
      <p className='text-lg my-10'>Cliente: {nombre}</p>
      <div>
        {pedido.map(platillo => (
            <div key={platillo.id} className='py-3 flex border-b last-of-type:border-0 items-center'>
                <div className='w-32'>
                    <Image width={400} height={500} src={`/assets/img/${platillo.imagen}.jpg`} alt={`Imagen Platillo ${platillo.nombre}`}/>
                </div>
                <div className='p-5 space-y-2 '>
                    <h4 className='text-xl font-bold text-amber-500'>{platillo.nombre}</h4>
                    <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Orden
