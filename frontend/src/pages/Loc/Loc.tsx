import { useEffect, useRef, useState } from "react"
import { ButtonForms } from "../../components/ButtonForms/ButtonForms"
import { CabecalhoForms } from "../../components/CabecalhoForms/CabecalhoForms"
import style from './Loc.module.css'

interface ViaCepResponse {
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: boolean
}

const Loc = () => {
    const [cep, setCep] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cepStatus, setCepStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
    const [coords, setCoords] = useState<[number, number] | null>(null)

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    // Carrega o Leaflet dinamicamente
    useEffect(() => {
        if (typeof window === 'undefined') return

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => initMap()
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(link)
            document.head.removeChild(script)
        }
    }, [])

    const initMap = () => {
        if (!mapRef.current || mapInstanceRef.current) return
        const L = (window as any).L
        const map = L.map(mapRef.current).setView([-15.78, -47.93], 5)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map)
        mapInstanceRef.current = map
    }

    const maskCep = (value: string) => {
        return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9)
    }

    const handleCepChange = async (value: string) => {
        const masked = maskCep(value)
        setCep(masked)
        const clean = masked.replace(/\D/g, '')
        if (clean.length !== 8) return

        setCepStatus('loading')
        try {
            const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
            const data: ViaCepResponse = await res.json()
            if (data.erro) {
                setCepStatus('error')
                return
            }
            setLogradouro(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setEstado(data.uf)
            setCepStatus('ok')
        } catch {
            setCepStatus('error')
        }
    }

    const geocodeAndPlot = async () => {
        if (!logradouro || !numero || !cidade) return
        const query = `${logradouro}, ${numero}, ${bairro}, ${cidade}, ${estado}, Brasil`
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
                { headers: { 'User-Agent': 'loc-app/1.0' } }
            )
            const data = await res.json()
            if (!data.length) return
            const lat = parseFloat(data[0].lat)
            const lon = parseFloat(data[0].lon)
            setCoords([lat, lon])
            plotMarker(lat, lon)
        } catch {
            // silently fail
        }
    }

    const plotMarker = (lat: number, lon: number) => {
        const L = (window as any).L
        if (!mapInstanceRef.current || !L) return

        if (markerRef.current) {
            markerRef.current.remove()
        }

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

    return (
        <>
            <CabecalhoForms BackButtonLink="/config" Tittle="Localização" />
            <div className={style.DivInputsCad2}>

                {/* CEP */}
                <div className={style.IconsCad2}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
                        <path fill="#031b83" d="M18.73 0.53C18.71 0.53 18.68 0.53 18.66 0.53L18.57 0.53C18.54 0.53 18.52 0.53 18.5 0.53C12.61 0.62 7.83 5.46 7.83 11.34C7.73 17.2 12.21 22.55 15.48 26.46C16.44 27.61 17.27 28.6 17.83 29.43C18 29.67 18.27 29.81 18.57 29.81L18.66 29.81C18.95 29.81 19.23 29.67 19.4 29.43C19.96 28.6 20.79 27.61 21.75 26.46C25.02 22.55 29.49 17.2 29.4 11.36C29.4 5.46 24.62 0.62 18.73 0.53ZM18.61 27.47C18.11 26.82 17.51 26.11 16.86 25.32C13.76 21.62 9.53 16.56 9.61 11.36C9.61 6.42 13.63 2.36 18.58 2.32C18.59 2.32 18.6 2.32 18.61 2.32C18.63 2.32 18.64 2.32 18.65 2.32C23.59 2.36 27.61 6.42 27.61 11.38C27.7 16.56 23.46 21.62 20.37 25.32C19.71 26.11 19.12 26.82 18.61 27.47ZM18.61 7.41C16.43 7.43 14.66 9.19 14.66 11.36C14.66 13.53 16.43 15.29 18.61 15.31C20.8 15.29 22.56 13.53 22.56 11.36C22.56 9.19 20.8 7.43 18.61 7.41Z"/>
                    </svg>
                    <input
                        type="text"
                        className={style.InputCad2}
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChange={e => handleCepChange(e.target.value)}
                        maxLength={9}
                    />
                    {cepStatus === 'loading' && <span style={{ fontSize: 12, color: '#888', paddingRight: 8 }}>...</span>}
                    {cepStatus === 'ok' && <span style={{ fontSize: 16, paddingRight: 8 }}>✓</span>}
                    {cepStatus === 'error' && <span style={{ fontSize: 12, color: 'red', paddingRight: 8 }}>CEP inválido</span>}
                </div>

                {/* Logradouro (preenchido automaticamente) */}
                <div className={style.IconsCad2}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
                        <path fill="#031b83" d="M35.08 32.83H33.56V11.36C33.56 11.06 33.32 10.82 33.01 10.82H19.18V1.64C19.18 1.34 18.94 1.1 18.63 1.1H4.25C3.95 1.1 3.71 1.34 3.71 1.64V32.83H2.18C1.88 32.83 1.64 33.07 1.64 33.38C1.64 33.68 1.88 33.92 2.18 33.92H35.09C35.39 33.92 35.63 33.68 35.63 33.38C35.63 33.07 35.39 32.83 35.08 32.83ZM4.8 2.19H18.09V32.83H4.8V2.19ZM19.18 32.83V11.91H32.47V32.83H19.18Z"/>
                    </svg>
                    <input
                        type="text"
                        className={style.InputCad2}
                        placeholder="Logradouro"
                        value={logradouro}
                        onChange={e => setLogradouro(e.target.value)}
                    />
                </div>

                {/* Número e Complemento */}
                <div className={style.SubIconsCad2}>
                    <div className={style.SubInputCad2}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
                            <path fill="#031b83" d="M18 1.21C11.35 1.21 5.95 6.65 5.95 13.35C5.95 17.29 8.34 22.25 10.96 26.34C12.27 28.38 13.64 30.2 14.83 31.52C15.43 32.18 15.98 32.72 16.48 33.11C16.98 33.5 17.38 33.81 18 33.81C18.74 33.81 19.21 33.39 19.84 32.84C20.47 32.3 21.18 31.54 21.94 30.63C23.46 28.79 25.17 26.32 26.63 23.67C28.54 20.2 30.05 16.46 30.05 13.35C30.05 6.65 24.65 1.21 18 1.21ZM18 7.76L22.68 11.27C22.86 11.41 22.96 11.61 22.96 11.84V17.51H20.84V13.26C20.84 13.06 20.77 12.89 20.63 12.75C20.49 12.62 20.32 12.55 20.13 12.55H15.87C15.68 12.55 15.51 12.62 15.37 12.75C15.23 12.89 15.16 13.06 15.16 13.26V17.51H13.04V11.84C13.04 11.61 13.14 11.41 13.32 11.27Z"/>
                        </svg>
                        <input
                            type="text"
                            className={style.InputCad2}
                            placeholder="Número"
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                            onBlur={geocodeAndPlot}
                        />
                    </div>
                    <div className={style.SubInputCad2}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
                            <path fill="#031b83" d="M4.52 33.93H30.25C30.38 33.93 30.5 33.88 30.58 33.78C30.66 33.68 30.7 33.56 30.68 33.43L26.09 1.46C26.05 1.25 25.88 1.09 25.66 1.09H9.11C8.9 1.09 8.71 1.25 8.68 1.46L4.09 33.43C4.07 33.56 4.11 33.68 4.2 33.78C4.28 33.88 4.39 33.93 4.52 33.93ZM17.39 23.54C17.15 23.54 16.96 23.34 16.96 23.1V19.12C16.96 18.88 17.15 18.69 17.39 18.69C17.63 18.69 17.82 18.88 17.82 19.12V23.1C17.82 23.34 17.63 23.54 17.39 23.54Z"/>
                        </svg>
                        <input
                            type="text"
                            className={style.InputCad2}
                            placeholder="Complemento"
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        />
                    </div>
                </div>

                {/* Cidade */}
                <div className={style.IconsCad2}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
                        <path fill="#031b83" d="M6.81 22.72C6.81 22.59 6.86 22.48 6.95 22.39C7.04 22.3 7.14 22.26 7.27 22.26H9.96C10.08 22.26 10.19 22.3 10.28 22.39C10.37 22.48 10.41 22.59 10.41 22.72C10.41 22.84 10.37 22.95 10.28 23.04C10.19 23.13 10.08 23.17 9.96 23.17H7.27C7.14 23.17 7.04 23.13 6.95 23.04C6.86 22.95 6.81 22.84 6.81 22.72ZM34.1 31.32V33.75C34.1 33.88 34.06 33.99 33.97 34.07C33.88 34.16 33.77 34.21 33.65 34.21H2.36C2.23 34.21 2.13 34.16 2.04 34.07C1.95 33.99 1.9 33.88 1.9 33.75V31.32C1.9 31.2 1.95 31.09 2.04 31C2.13 30.91 2.23 30.87 2.36 30.87H4.64V19.93C4.64 19.8 4.68 19.7 4.77 19.61C4.86 19.52 4.97 19.47 5.09 19.47H10.07V6.2C10.07 6.0 10.16 5.86 10.33 5.78L20.73 0.89C20.81 0.86 20.88 0.84 20.96 0.84C21.04 0.85 21.11 0.88 21.18 0.91C21.24 0.96 21.29 1.01 21.33 1.08C21.37 1.15 21.39 1.22 21.39 1.3V12.17H22.31V5.71C22.31 5.63 22.33 5.55 22.37 5.49C22.4 5.42 22.46 5.36 22.52 5.32C22.59 5.28 22.66 5.25 22.74 5.25C22.82 5.25 22.89 5.26 22.96 5.29L28.39 7.85C28.57 7.93 28.65 8.07 28.65 8.26V17.71H30.91C31.04 17.71 31.14 17.76 31.23 17.84C31.32 17.93 31.37 18.04 31.37 18.17V19.45C31.65 19.65 31.91 19.89 32.14 20.15C32.37 20.41 32.56 20.7 32.72 21.01C32.88 21.32 33 21.64 33.08 21.98C33.17 22.32 33.21 22.66 33.21 23.01C33.21 23.36 33.17 23.7 33.08 24.04C33 24.38 32.88 24.7 32.72 25.01C32.56 25.32 32.37 25.61 32.14 25.87C31.91 26.14 31.65 26.37 31.37 26.57V28.27C31.8 28.48 32.15 28.8 32.4 29.21C32.66 29.62 32.79 30.07 32.79 30.55C32.79 30.66 32.78 30.77 32.77 30.87H33.65C33.77 30.87 33.88 30.91 33.97 31C34.06 31.09 34.1 31.2 34.1 31.32Z"/>
                    </svg>
                    <input
                        type="text"
                        className={style.InputCad2}
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                    />
                </div>

                {/* Mapa OSM */}
                <div className={style.Amaldito}>
                    <div
                        ref={mapRef}
                        style={{
                            width: '80%',
                            height: '220px',
                            borderRadius: '10px',
                            border: '2px solid var(--cinzaClaro)',
                            overflow: 'hidden',
                        }}
                    />
                </div>

                <ButtonForms ButtonFormsText="Finalizar" ButtonFormsLink="/config" />
            </div>
        </>
    )
}

export { Loc }
