import style from './Carrosel.module.css'
import { CarroselButton } from './CarroselButton/CarroselButton'
import { useAccessibility } from '../../context/AccessibilityContext'
const CarroselDIV = () => {
    const { handleRead } = useAccessibility();
    return (
        <div className={style.DivCarroselFath}>
            <h1>Por que usar o <span>GoDocs</span>?</h1>
            
                <div className={style.DivCarrosel} onMouseEnter={handleRead} alt="foto de motos enfileiradas">
                    <div className={style.MeiaLua}>
                    <h2 onMouseEnter={handleRead}>Envios ágeis com <br></br> parceiros estratégicos em<br></br> todo o Brasil.</h2>
                    <CarroselButton></CarroselButton>
                    </div>
                </div>
            
        </div>
    )
}

export { CarroselDIV }