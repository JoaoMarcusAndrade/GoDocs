import { useEffect, useRef, useState } from "react"
import styles from "./DeliverySteps.module.css"
import CasaIcon from '../../assets/Casa2SVG.svg'
import { useNavigate } from "react-router-dom"


const Step1SelectDestination = () => {
    const [origin, setOriginState] = useState({ cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '', status: 'idle' as 'idle' | 'loading' | 'ok' | 'error' })
    const [dest, setDestState] = useState({ cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '', status: 'idle' as 'idle' | 'loading' | 'ok' | 'error' })
    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null)

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const originMarkerRef = useRef<any>(null)
    const destMarkerRef = useRef<any>(null)
    const routeLayerRef = useRef<any>(null)

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => loadLeaflet(), 100)
        return () => clearTimeout(timer)
    }, [])

    const loadLeaflet = () => {
        if ((window as any).L) { initMap(); return }
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => initMap()
        document.head.appendChild(script)
    }

    const initMap = () => {
        if (!mapRef.current || mapInstanceRef.current) return
        const L = (window as any).L
        const map = L.map(mapRef.current).setView([-15.78, -47.93], 5)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19,
        }).addTo(map)
        mapInstanceRef.current = map
    }

    const maskCep = (value: string) =>
        value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9)

    const fetchCep = async (clean: string) => {
        const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
        const data = await res.json()
        if (data.erro) throw new Error('CEP inválido')
        return data
    }

    const handleCepChange = async (value: string, which: 'origin' | 'dest') => {
        const masked = maskCep(value)
        const setter = which === 'origin' ? setOriginState : setDestState
        setter(prev => ({ ...prev, cep: masked }))
        const clean = masked.replace(/\D/g, '')
        if (clean.length !== 8) return
        setter(prev => ({ ...prev, status: 'loading', logradouro: '', bairro: '', cidade: '', uf: '' }))
        try {
            const data = await fetchCep(clean)
            setter(prev => ({ ...prev, logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf, status: 'ok' }))
        } catch {
            setter(prev => ({ ...prev, status: 'error' }))
        }
    }

    const geocode = async (addr: typeof origin): Promise<[number, number] | null> => {
        if (!addr.logradouro || !addr.numero || !addr.cidade) return null
        const q = `${addr.logradouro}, ${addr.numero}, ${addr.bairro}, ${addr.cidade}, ${addr.uf}, Brasil`
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
                { headers: { 'User-Agent': 'godocs-delivery/1.0' } }
            )
            const data = await res.json()
            if (!data.length) return null
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
        } catch {
            return null
        }
    }

    const makeIcon = (color: string) => {
        const L = (window as any).L
        return L.divIcon({
            className: '',
            html: `<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1C7.37 1 2 6.37 2 13c0 10 12 26 12 26S26 23 26 13C26 6.37 20.63 1 14 1z" fill="${color}"/>
                <circle cx="14" cy="13" r="5" fill="white" opacity=".9"/>
            </svg>`,
            iconSize: [28, 40],
            iconAnchor: [14, 40],
        })
    }

    const handleTracarRota = async () => {
        const L = (window as any).L
        if (!mapInstanceRef.current || !L) return

        const oCoords = await geocode(origin)
        const dCoords = await geocode(dest)
        if (!oCoords || !dCoords) return

        // Remove markers e rota anteriores
        if (originMarkerRef.current) originMarkerRef.current.remove()
        if (destMarkerRef.current) destMarkerRef.current.remove()
        if (routeLayerRef.current) routeLayerRef.current.remove()

        originMarkerRef.current = L.marker(oCoords, { icon: makeIcon('#031b83') })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Saída</b><br>${origin.logradouro}, ${origin.numero}`)

        destMarkerRef.current = L.marker(dCoords, { icon: makeIcon('#cc0000') })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>Entrega</b><br>${dest.logradouro}, ${dest.numero}`)

        // Rota OSRM
        try {
            const [oLat, oLon] = oCoords
            const [dLat, dLon] = dCoords
            const res = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${oLon},${oLat};${dLon},${dLat}?overview=full&geometries=geojson`
            )
            const data = await res.json()
            if (data.routes?.length) {
                const route = data.routes[0]
                routeLayerRef.current = L.geoJSON(route.geometry, {
                    style: { color: '#031b83', weight: 4, opacity: 0.85 }
                }).addTo(mapInstanceRef.current)
                mapInstanceRef.current.fitBounds(routeLayerRef.current.getBounds().pad(0.15))

                const km = (route.distance / 1000).toFixed(1)
                const min = Math.round(route.duration / 60)
                const h = Math.floor(min / 60)
                const m = min % 60

                const routeData = {
                    distance: `${km} km`,
                    duration: h > 0 ? `${h}h ${m}min` : `${m} min`
                }

                setRouteInfo(routeData)

                // 🚀 AQUI entra o navigate
                navigate("/delistep2", {
                    state: {
                        origin,
                        dest,
                        routeInfo: routeData,
                        coords: {
                            origin: oCoords,
                            dest: dCoords
                        }
                    }
                })
            }
        } catch {
            mapInstanceRef.current.fitBounds([oCoords, dCoords])
        }
    }

    const canTrace = origin.status === 'ok' && origin.numero.trim() !== '' && dest.status === 'ok' && dest.numero.trim() !== ''

    const StatusIndicator = ({ status }: { status: string }) => {
        if (status === 'loading') return <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#888' }}>buscando...</span>
        if (status === 'ok') return <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#1a7a3f', fontSize: 16 }}>✓</span>
        if (status === 'error') return <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#cc0000' }}>CEP inválido</span>
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.topCard}>

                {/* Origem */}
                <div style={{ fontSize: 11, fontWeight: 600, color: '#031b83', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Saída
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        placeholder="CEP de saída"
                        className={styles.input}
                        value={origin.cep}
                        onChange={e => handleCepChange(e.target.value, 'origin')}
                        maxLength={9}
                    />
                    <StatusIndicator status={origin.status} />
                </div>
                {origin.status === 'ok' && (
                    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                        <input
                            placeholder="Logradouro"
                            className={styles.input}
                            value={origin.logradouro}
                            onChange={e => setOriginState(p => ({ ...p, logradouro: e.target.value }))}
                            style={{ flex: 2 }}
                        />
                        <input
                            placeholder="Nº"
                            className={styles.input}
                            value={origin.numero}
                            onChange={e => setOriginState(p => ({ ...p, numero: e.target.value }))}
                            style={{ flex: 1 }}
                        />
                    </div>
                )}

                {/* Destino */}
                <div style={{ fontSize: 11, fontWeight: 600, color: '#cc0000', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>
                    Entrega
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        placeholder="CEP de entrega"
                        className={styles.input}
                        value={dest.cep}
                        onChange={e => handleCepChange(e.target.value, 'dest')}
                        maxLength={9}
                    />
                    <StatusIndicator status={dest.status} />
                </div>
                {dest.status === 'ok' && (
                    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                        <input
                            placeholder="Logradouro"
                            className={styles.input}
                            value={dest.logradouro}
                            onChange={e => setDestState(p => ({ ...p, logradouro: e.target.value }))}
                            style={{ flex: 2 }}
                        />
                        <input
                            placeholder="Nº"
                            className={styles.input}
                            value={dest.numero}
                            onChange={e => setDestState(p => ({ ...p, numero: e.target.value }))}
                            style={{ flex: 1 }}
                        />
                    </div>
                )}

                {/* Info da rota */}
                {routeInfo && (
                    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                        <div style={{ flex: 1, textAlign: 'center', padding: '6px 0', border: '1px solid #ddd', borderRadius: 8 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#031b83' }}>{routeInfo.distance}</div>
                            <div style={{ fontSize: 11, color: '#888' }}>DISTÂNCIA</div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', padding: '6px 0', border: '1px solid #ddd', borderRadius: 8 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#cc0000' }}>{routeInfo.duration}</div>
                            <div style={{ fontSize: 11, color: '#888' }}>TEMPO EST.</div>
                        </div>
                    </div>
                )}

                {/* Favoritos */}
                <div className={styles.favorite}>
                    <span className={styles.icon}><img src={CasaIcon} /></span>
                    <span>Casa</span>
                    <span className={styles.addIcon}>+</span>
                </div>

                {/* Botão traçar */}
                {canTrace && (
                    <button
                        onClick={handleTracarRota}
                        style={{
                            width: '100%',
                            height: 44,
                            background: '#031b83',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Traçar rota
                    </button>
                )}
            </div>

            {/* Mapa */}
            <div
                ref={mapRef}
                className={styles.mapPlaceholder}
                style={{ padding: 0, overflow: 'hidden' }}
            />
        </div>
    )
}

export { Step1SelectDestination };