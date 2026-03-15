import SegurancaIcon from '../../assets/SegurançaSVG.svg'
import style from './ButtonsACC.module.css'
const SegurançaButton = () => {
    return (
        <button className={style.AccButtons}>
            <img src={SegurancaIcon}></img>
            <span>Segurança</span>
        </button>
    )
}

export { SegurançaButton }