import styles from "./DeliverySteps.module.css"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import avatarEntreg from '../../assets/IconePerfilSVG.svg'
const Step3Tracking = () => {
  const location = useLocation()

  const navigate = useNavigate()

  const [started, setStarted] = useState(false)

  const [finished, setFinished] = useState(false)

  const [progressState, setProgressState] = useState(0)

  const { coords, routeInfo, origin, dest, preco, size } = location.state || {}

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

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

      const origin = [oLat, oLon]
      const dest = [dLat, dLon]

      const line = L.polyline([origin, dest], {
        color: "#031b83",
        weight: 4
      }).addTo(map)

      map.fitBounds(line.getBounds().pad(0.2))

      // 🔥 GUARDA O MARKER
      markerRef.current = L.marker(origin).addTo(map)

      mapInstanceRef.current = map

      setTimeout(() => {
        map.invalidateSize()
      }, 200)
    }

    if (!(window as any).L) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = loadMap
      document.head.appendChild(script)
    } else {
      loadMap()
    }

  }, [coords])

  useEffect(() => {
    if (!started || !coords || !markerRef.current) return

    const [oLat, oLon] = coords.origin
    const [dLat, dLon] = coords.dest

    let progress = 0

    const interval = setInterval(() => {
      progress += 0.01

      if (progress >= 1) {
        clearInterval(interval)
        setFinished(true)
        setProgressState(1)
        return
      }

      const lat = oLat + (dLat - oLat) * progress
      const lon = oLon + (dLon - oLon) * progress

      markerRef.current.setLatLng([lat, lon])
      mapInstanceRef.current.panTo([lat, lon])

      setProgressState(progress)
    }, 100)

    return () => clearInterval(interval)

  }, [started])

  return (
    <div className={styles.container}>
      <div
        ref={mapRef}
        className={styles.mapPlaceholder}
        style={{ height: "100%" }}
      />

      <div className={styles.bottomCard}>
        {!finished ? (
          <>
            <h3>Entregador encontrado</h3>
            <hr />
            <div className={styles.trackingInfo}>
              <div>
                <p><span>Nome:</span> roberto</p>
                <p><span>há {routeInfo.duration} de você</span></p>
              </div>
              <div className={styles.avatarCircle}><img src={avatarEntreg}></img></div>
              <span>{routeInfo.distance}</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progressState * 100}%` }}
              />
            </div>

            <button
              className={styles.actionButton}
              onClick={() => setStarted(true)}
            >
              Confirmar
            </button>
          </>
        ) : (
          <>
            <h3>Seu entregador chegou </h3>
            <hr />
            <p style={{ textAlign: "center", margin: "20px 0" }}>
              Obrigado por contratar a GoDocs!
            </p>

            <button
              className={styles.actionButton}
              onClick={() => navigate("/home")}
            >
              Finalizar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export { Step3Tracking };