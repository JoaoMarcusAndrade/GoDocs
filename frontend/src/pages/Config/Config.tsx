import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import style from './Config.module.css'
import Loc from '../../assets/LocalizaçãoSVG.svg'
import SairContaIcon from '../../assets/SairSVG.svg'
const Config = () => {
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/home/conta"></CabecalhoGodocsBack>
            <div className={style.ConfigText}>
                <h1>Configurações</h1>
            </div>
            <div className={style.DivButtonsConfig}>
                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Localização</span>
                </button>

                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Aparência</span>
                </button>

                <button className={style.OtherButtons}>
                    <img src={Loc}></img>
                    <span>Acessibilidade</span>
                </button>
                <button className={style.OtherButtons}>
                    <img src={SairContaIcon}></img>
                    <span className={style.SairContav}>Sair da conta</span>
                </button>

            </div>
        </>
    )
}

export { Config }