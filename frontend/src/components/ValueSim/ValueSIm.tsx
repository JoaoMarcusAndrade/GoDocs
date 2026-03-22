import style from './ValueSIm.module.css'
import LocIcon from '../../assets/LocalizaçãoSVG.svg'
import { useAccessibility } from '../../context/AccessibilityContext'

const ValueSim = () => {
    const { handleRead } = useAccessibility();
    return (
        <div className={style.ValueSim}>
            <div className={style.ValueSimSon}>
                <div className={style.ValueSimSonText}>
                    <h6 onMouseEnter={handleRead}>Simular valor de entrega</h6>
                    <p onMouseEnter={handleRead}>Simule o valor da Sua entrega antes de Enviar</p>
                </div>
                <div>
                    <img src={LocIcon}></img>
                </div>
            </div>
        </div>
    )
}

export { ValueSim }