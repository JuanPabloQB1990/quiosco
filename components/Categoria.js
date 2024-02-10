import Image from "next/image";
import React from "react";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { nombre, icono, id } = categoria;

  const { handleClickCategoriaActual, categoriaActual } = useQuiosco()

  return (
    <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 ${categoriaActual?.id === id ? 'bg-amber-400' : ''}`}>
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen icono"
      />
      <button onClick={()=>handleClickCategoriaActual(id)} type="button" className="text-2xl font-bold hover:cursor-pointer">{nombre}</button>
    </div>
  );
};

export default Categoria;
