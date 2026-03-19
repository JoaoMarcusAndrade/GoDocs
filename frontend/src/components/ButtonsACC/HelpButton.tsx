import AjudaIcon from '../../assets/AjudaSVG.svg'
import style from './ButtonsACC.module.css'

const HelpButton = () => {

    return (
        <button className={style.AccButtons}>
            <img src={AjudaIcon}></img>
            <span>Ajuda</span>
        </button>
    )

}

export { HelpButton }