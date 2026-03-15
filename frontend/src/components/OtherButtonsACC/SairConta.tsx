import style from './OhterButtons.module.css'
import SairContaIcon from '../../assets/SairSVG.svg'
const SairConta = () => {
    return (
        <button className={style.OtherButtons}>
            <img src={SairContaIcon}></img>
            <span className={style.SairContav}>Sair da conta</span>
        </button>
    )
}

export { SairConta }