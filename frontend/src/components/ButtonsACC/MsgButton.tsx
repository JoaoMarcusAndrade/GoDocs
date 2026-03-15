import MsgIcon from '../../assets/MensagensSVG.svg'
import style from './ButtonsACC.module.css'
const MsgButton = () => {
    return (
        <button className={style.AccButtons}>
            <img src={MsgIcon}></img>
            <span>Mensagens</span>
        </button>
    )

}

export { MsgButton }