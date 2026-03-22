import styles from "./DeliverySteps.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect, useRef } from "react"

const Step2ChooseDelivery = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { origin, dest, routeInfo, coords } = location.state || {}

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!coords) return

    const loadMap = () => {
      const L = (window as any).L
      if (!L || !mapRef.current || mapInstanceRef.current) return

      const map = L.map(mapRef.current)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      const [oLat, oLon] = coords.origin
      const [dLat, dLon] = coords.dest

      const line = L.polyline([
        [oLat, oLon],
        [dLat, dLon]
      ]).addTo(map)

      map.fitBounds(line.getBounds().pad(0.2))

      // 🔥 CORREÇÃO PRINCIPAL
      setTimeout(() => {
        map.invalidateSize()
      }, 100)

      mapInstanceRef.current = map
    }

    loadMap()
  }, [coords])

  const [size, setSize] = useState("medio")

  // proteção caso entre direto na rota
  if (!routeInfo) {
    return <p>Dados da rota não encontrados.</p>
  }

  const distanciaKm = parseFloat(routeInfo.distance)

  // simulação de preço
  const precos: any = {
    pequeno: distanciaKm * 1.5,
    medio: distanciaKm * 2,
    grande: distanciaKm * 3
  }

  const preco = precos[size].toFixed(2)



  return (
    <div className={styles.container}>
      <div
        ref={mapRef}
        className={styles.mapPlaceholder}
        style={{ padding: 0, overflow: "hidden" }}
      />

      <div className={styles.bottomCard}>
        <h3>Escolha a Opção de entrega</h3>
        <hr />

        <div className={styles.deliveryOptions}>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className={styles.deliveryInfo}>
          <span>{routeInfo.duration}</span>
          <p>Entregador parceiro a {routeInfo.duration} de distância - Entrega Moto</p>
          <span>R${preco}</span>
        </div>

        <button
          className={styles.actionButton}
          onClick={() =>
            navigate("/delistep3", {
              state: {
                origin,
                dest,
                routeInfo,
                coords, // 🔥 ESSENCIAL
                size,
                preco
              }
            })
          }
        >
          <span>Avançar</span>
        </button>
      </div>
    </div>
  )
}

export { Step2ChooseDelivery }