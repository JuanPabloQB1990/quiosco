import AdminLayout from "../layout/AdminLayout";
import Orden from "../components/Orden";
import useQuiosco from "../hooks/useQuiosco";
import { useEffect } from "react";

const admin = () => {
  const { obtenerOrdenes, ordenes } = useQuiosco();



  return (
    <AdminLayout pagina="Admin">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>
      {ordenes && ordenes.length ? (
        ordenes.map((orden) => <Orden orden={orden} key={orden.id} />)
      ) : (
        <p>No hay ordenes Pendientes</p>
      )}
    </AdminLayout>
  );
};

export default admin;
