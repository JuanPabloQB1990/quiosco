import axios from 'axios'
import AdminLayout from '../layout/AdminLayout'
import useSWR from 'swr'
import Orden from '../components/Orden'

const admin = () => {

    const fetcher = (params) => {
      return axios('/api/ordenes').then(datos => datos.data)
    }
    
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100})


  return (
    <AdminLayout pagina="Admin">
      <h1 className='text-4xl font-black'>Panel de Administracion</h1>
      <p className='text-2xl my-10'>Administra las ordenes</p>
      {data && data.length ? data.map(orden => (
        <Orden orden={orden} key={orden.id}/>
      )) : <p >No hay ordenes Pendientes</p>}
    </AdminLayout>
  )
}

export default admin
