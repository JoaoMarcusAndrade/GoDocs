import { Link } from 'react-router-dom'
import SegurancaIcon from '../../assets/SegurançaSVG.svg'
import style from './ButtonsACC.module.css'
const SegurançaButton = () => {
    return (
        <Link to="/seg">
        <button className={style.AccButtons}>
            <img src={SegurancaIcon}></img>
            <span>Segurança</span>
        </button>
        </Link>
    )
}

export { SegurançaButton }