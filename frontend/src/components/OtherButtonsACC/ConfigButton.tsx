import { Link } from 'react-router-dom'
import ConfigIcon from '../../assets/ConfigSVG.svg'
import style from './OhterButtons.module.css'
const ConfigButton = () => {
    return (
        <Link to="/config" className={style.Amaldito}>
            <button className={style.OtherButtons}>
                <img src={ConfigIcon}></img>
                <span>Configurações</span>
            </button>
        </Link>
    )
}

export { ConfigButton }