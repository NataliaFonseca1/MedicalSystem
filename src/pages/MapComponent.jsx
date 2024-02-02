import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from 'axios'

const MapComponent = () => {
  const [ufData, setUfData] = useState([])
  const [clientCountByUf, setClientCountByUf] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clients/state')
        console.log('Client Count by UF:', response.data)
        setClientCountByUf(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos clientes por UF:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const wmsUrl =
      'http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms?service=WMS&version=1.1.0&request=GetMap&layers=processo_seletivo:ufs_brasil&styles=&bbox=-74.000000,-34.000000,-28.000000,5.000000&width=768&height=330&srs=EPSG:4326&format=application/openlayers'

    const fetchUfData = async () => {
      try {
        const response = await axios.get(wmsUrl, { responseType: 'blob' })
        setUfData(URL.createObjectURL(response.data))
      } catch (error) {
        console.error('Erro ao buscar dados dos estados:', error)
      }
    }

    fetchUfData()
  }, [])

  const onEachUf = (feature, layer) => {
    const ufCode = feature.properties.sigla
    const clientCount = clientCountByUf[ufCode] || 0

    layer.bindPopup(`<strong>${ufCode}</strong><br>Clientes: ${clientCount}`)
  }

  return (
    <MapContainer
      center={[-15.77972, -47.92972]}
      zoom={10}
      style={{ height: '100px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={ufData} onEachFeature={onEachUf} />
    </MapContainer>
  )
}

export default MapComponent
