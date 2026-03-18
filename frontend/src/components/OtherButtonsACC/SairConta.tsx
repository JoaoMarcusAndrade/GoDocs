import style from './OhterButtons.module.css'
import SairContaIcon from '../../assets/SairSVG.svg'
const SairConta = (props) => {
    return (
        <button className={style.OtherButtons} onClick={props.onClick}>
            <img src={SairContaIcon}></img>
            <span className={style.SairContav}>Sair da conta</span>
        </button>
    )
}

export { SairConta }