import { Link } from 'react-router-dom'
import MsgIcon from '../../assets/MensagensSVG.svg'
import style from './ButtonsACC.module.css'
const MsgButton = () => {
    return (
        <Link to="/msg">
        <button className={style.AccButtons}>
            <img src={MsgIcon}></img>
            <span>Mensagens</span>
        </button>
        </Link>
    )

}

export { MsgButton }