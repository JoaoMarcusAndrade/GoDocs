import style from './ValueSIm.module.css'
import LocIcon from '../../assets/LocalizaçãoSVG.svg'
const ValueSim = () => {
    return (
        <div className={style.ValueSim}>
            <div className={style.ValueSimSon}>
                <div className={style.ValueSimSonText}>
                    <h6>Simular valor de entrega</h6>
                    <p>Simule o valor da Sua entrega antes de Enviar</p>
                </div>
                <div>
                    <img src={LocIcon}></img>
                </div>
            </div>
        </div>
    )
}

export { ValueSim }