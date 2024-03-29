import ResumenPedido from "../components/ResumenPedido";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

const Resumen = () => {

    const { pedido } = useQuiosco()
  
    return (
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black" >Resumen</h1>
            <p className="text-2xl my-10">Revisa tu Pedido</p>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu pedido</p>
            ) : (pedido.map(producto => (
                <ResumenPedido key={producto.id} producto={producto}/>
            )))}
        </Layout>
    )
}

export default Resumen;
