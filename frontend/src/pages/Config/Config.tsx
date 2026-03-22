import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import style from './Config.module.css'
import Loc from '../../assets/LocalizaçãoSVG.svg'
import SairContaIcon from '../../assets/SairSVG.svg'
import { Link } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
const Config = () => {
    const [showAppearance, setShowAppearance] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <div className={style.Configs}>
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

                    <button className={style.OtherButtons} onClick={() => setShowAppearance(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                        </svg>
                        <span>Aparência</span>
                    </button>
                    <Link to="/acessibilidade" className={style.Amaldito}>
                        <button className={style.OtherButtons}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-universal-access" viewBox="0 0 16 16">
                                <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9z" />
                            </svg>
                            <span>Acessibilidade</span>
                        </button>
                    </Link>
                    <button className={style.OtherButtons}>
                        <img src={SairContaIcon}></img>
                        <span className={style.SairContav}>Sair da conta</span>
                    </button>

                </div>
            </div>
            {
                showAppearance && (
                    <div className={style.overlay} onClick={() => setShowAppearance(false)}>

                        <div
                            className={style.modal}
                            onClick={(e) => e.stopPropagation()} // 🔥 impede fechar ao clicar dentro
                        >
                            <h2>Aparência</h2>

                            <div className={style.option}>
                                <span>Modo claro</span>
                                <input type="radio" name="theme" checked={theme === "light"}
                                    onChange={() => setTheme("light")} />
                            </div>

                            <div className={style.option}>
                                <span>Modo escuro</span>
                                <input type="radio" name="theme"
                                    checked={theme === "dark"}
                                    onChange={() => setTheme("dark")}
                                />
                            </div>

                            <button className={style.saveBtn}>Salvar</button>

                            <button
                                className={style.cancelBtn}
                                onClick={() => setShowAppearance(false)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </div>

                )
            }
        </>
    )
}

export { Config }