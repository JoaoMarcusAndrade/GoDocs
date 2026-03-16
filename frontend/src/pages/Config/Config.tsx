import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import style from './Config.module.css'
import Loc from '../../assets/LocalizaçãoSVG.svg'
import SairContaIcon from '../../assets/SairSVG.svg'
import { Link } from "react-router-dom"
const Config = () => {
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/home/conta"></CabecalhoGodocsBack>
            <div className={style.ConfigText}>
                <h1>Configurações</h1>
            </div>
            <div className={style.DivButtonsConfig}>
                <Link to="/loc" className={style.Amaldito}>
                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Localização</span>
                </button>
                </Link>

                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Aparência</span>
                </button>
              <Link to="/acessibilidade" className={style.Amaldito}>
                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Acessibilidade</span>
                </button>
                </Link>
                <button className={style.OtherButtons}>
                    <img src={SairContaIcon}></img>
                    <span className={style.SairContav}>Sair da conta</span>
                </button>

            </div>
        </>
    )
}

export { Config }