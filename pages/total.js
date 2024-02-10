import { useCallback, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import { formatearDinero } from "../helpers";

const Total = () => {

  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()
  
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre.length < 4
  }, [pedido, nombre])

  useEffect(() => {
    comprobarPedido()
  }, [pedido, comprobarPedido]);
  
  console.log(total);
  
  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">confirma tu pedido a Continuación</p>
      <form onSubmit={colocarOrden}>
        <div>
          <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md" id="nombre"/>
        </div>
        <div className="mt-10"> 
          <p className="text-2xl">Total a pagar {''}<span className="font-bold">{formatearDinero(total)}</span></p>
        </div>
        <div className="mt-5">
          <input disabled={comprobarPedido()} type="submit" value='Confirmar Pedido' className={`${comprobarPedido() ? 'bg-indigo-300' : 'bg-indigo-600 cursor-pointer hover:bg-indigo-800'}  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center `}/>
        </div>
      </form>
    </Layout>
  );
};

export default Total;
