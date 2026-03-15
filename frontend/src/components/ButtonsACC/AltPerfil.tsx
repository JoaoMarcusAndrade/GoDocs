import { Link } from 'react-router-dom'
import PerfilIcon from '../../assets/IconePerfilformSVG.svg'
import style from './ButtonsACC.module.css'
const AltPerfil = () => {
    return (
        <Link to="/alt" className={style.Amaldito}>
            <button className={style.AccButtons}>
                <img src={PerfilIcon}></img>
                <span>Alterar perfil</span>
            </button>
        </Link>
    )
}

export { AltPerfil }