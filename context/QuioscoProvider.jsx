import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    if (pedido.length > 0) {
      const nuevoTotal = pedido.reduce(
        (total, producto) => producto.precio * producto.cantidad + total,
        0
      );

      setTotal(nuevoTotal);
    }
  }, [pedido]);

  const handleClickCategoriaActual = (id) => {
    const categoriaFilter = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoriaFilter[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Pedido Modificado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);

    setProducto(productoActualizar[0]);
    setModal(!modal);
    setEdicion(!edicion);
  };

  const handleEliminarCantidades = (id) => {
    const pedidoModificado = pedido.filter((pedido) => pedido.id !== id);
    setPedido(pedidoModificado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      //resetear la app
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      toast.success("Pedido realizado Correctamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const completarOrden = async (id) => {
    try {
      const res = await axios.post(`/api/ordenes/${id}`);
      const data = res.json();
      console.log(data);
      toast.success("Orden lista", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoriaActual,
        categoriaActual,
        handleSetProducto,
        handleChangeModal,
        modal,
        producto,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        edicion,
        handleEliminarCantidades,
        nombre,
        setNombre,
        colocarOrden,
        total,
        completarOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoProvider;
