import { useEffect, useRef, useState } from "react"
import styles from "./DeliverySteps.module.css"
import CasaIcon from '../../assets/Casa2SVG.svg'
import { useNavigate } from "react-router-dom"
import { useDelivery } from "./DeliveryContext"

const Step1SelectDestination = () => {
    const { setOrigin } = useDelivery()
    const navigate = useNavigate()

    const [cep, setCep] = useState('')
    const [numero, setNumero] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [cepStatus, setCepStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    useEffect(() => {
        loadLeaflet()
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

    const handleCepChange = async (value: string) => {
        const masked = maskCep(value)
        setCep(masked)
        const clean = masked.replace(/\D/g, '')
        if (clean.length !== 8) return

        setCepStatus('loading')
        setLogradouro('')
        setBairro('')
        setCidade('')
        setUf('')

        try {
            const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
            const data = await res.json()
            if (data.erro) { setCepStatus('error'); return }
            setLogradouro(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setUf(data.uf)
            setCepStatus('ok')
        } catch {
            setCepStatus('error')
        }
    }

    const geocodeAndPlot = async (): Promise<[number, number] | null> => {
        if (!logradouro || !numero || !cidade) return null
        const q = `${logradouro}, ${numero}, ${bairro}, ${cidade}, ${uf}, Brasil`
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
                { headers: { 'User-Agent': 'godocs-delivery/1.0' } }
            )
            const data = await res.json()
            if (!data.length) return null
            const lat = parseFloat(data[0].lat)
            const lon = parseFloat(data[0].lon)
            plotMarker(lat, lon)
            return [lat, lon]
        } catch {
            return null
        }
    }

    const plotMarker = (lat: number, lon: number) => {
        const L = (window as any).L
        if (!mapInstanceRef.current || !L) return
        if (markerRef.current) markerRef.current.remove()

        const icon = L.divIcon({
            className: '',
            html: `<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1C7.37 1 2 6.37 2 13c0 10 12 26 12 26S26 23 26 13C26 6.37 20.63 1 14 1z" fill="#031b83"/>
                <circle cx="14" cy="13" r="5" fill="white" opacity=".9"/>
            </svg>`,
            iconSize: [28, 40],
            iconAnchor: [14, 40],
        })

        markerRef.current = L.marker([lat, lon], { icon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`${logradouro}, ${numero}`)

        mapInstanceRef.current.setView([lat, lon], 16)
    }

    const handleNext = async () => {
        const coords = await geocodeAndPlot()
        setOrigin({ cep, logradouro, numero, bairro, cidade, uf, coords })
        navigate('/delistep2')
    }

    const canProceed = cepStatus === 'ok' && numero.trim() !== ''

    return (
        <div className={styles.container}>
            <div className={styles.topCard}>

                {/* CEP */}
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        placeholder="CEP de saída (ex: 01310-100)"
                        className={styles.input}
                        value={cep}
                        onChange={e => handleCepChange(e.target.value)}
                        maxLength={9}
                    />
                    {cepStatus === 'loading' && (
                        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#888' }}>
                            buscando...
                        </span>
                    )}
                    {cepStatus === 'ok' && (
                        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#1a7a3f', fontSize: 16 }}>
                            ✓
                        </span>
                    )}
                    {cepStatus === 'error' && (
                        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#cc0000' }}>
                            CEP inválido
                        </span>
                    )}
                </div>

                {/* Logradouro — aparece após CEP válido */}
                {cepStatus === 'ok' && (
                    <input
                        placeholder="Logradouro"
                        className={styles.input}
                        value={logradouro}
                        onChange={e => setLogradouro(e.target.value)}
                    />
                )}

                {/* Número — dispara geocoding ao sair do campo */}
                {cepStatus === 'ok' && (
                    <input
                        placeholder="Número"
                        className={styles.input}
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        onBlur={geocodeAndPlot}
                    />
                )}

                <div className={styles.favorite}>
                    <span className={styles.icon}><img src={CasaIcon} /></span>
                    <span>Casa</span>
                    <span className={styles.addIcon}>+</span>
                </div>
            </div>

            {/* Mapa OSM — substitui o mapPlaceholder */}
            <div
                ref={mapRef}
                className={styles.mapPlaceholder}
                style={{ padding: 0, overflow: 'hidden' }}
            />

            {/* Botão fixo no rodapé, aparece quando pode avançar */}
            {canProceed && (
                <button
                    onClick={handleNext}
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'calc(100% - 48px)',
                        maxWidth: 432,
                        height: 48,
                        background: '#031b83',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        zIndex: 1000,
                    }}
                >
                    Próximo →
                </button>
            )}
        </div>
    )
}

export { Step1SelectDestination }
