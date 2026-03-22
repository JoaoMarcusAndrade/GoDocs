import { CabecalhoGodocsBack } from '../../components/CabecalhoGoDocsBack/CabecalhoGodocs'
import styles from './Acessibilidade.module.css'
import AceIcon from '../../assets/Acessibilidade.png'
import TextIcon from '../../assets/Texts.png'
import { FontSizeControl } from '../../components/FontSize/FontSizeControl'
import { useAccessibility } from '../../context/AccessibilityContext'
const Acessibilidade = () => {
    const { enabled, setEnabled } = useAccessibility();
    const { handleRead } = useAccessibility();
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/config"></CabecalhoGodocsBack>
            <div className={styles.container}>
                <img src={AceIcon} className={styles.icon}></img>

                <h1 className={styles.title} onMouseEnter={handleRead}>Acessibilidade</h1>

                <p className={styles.description} onMouseEnter={handleRead}>
                    Defina suas preferências de acessibilidade.
                </p>

                <p className={styles.description} onMouseEnter={handleRead}>
                    Saiba como funciona a acessibilidade na plataforma da GoDocs,
                    <span className={styles.link} onMouseEnter={handleRead}> acesse nosso Site.</span>
                </p>

                <div className={styles.options}>

                    {/* Audição */}
                    <div className={styles.option}>
                        <div className={styles.left}>
                            <div className={styles.icon}><img src={AceIcon} className={styles.icon}></img></div>

                            <div>
                                <p className={styles.optionTitle} onMouseEnter={handleRead}>Audição</p>
                                <p className={styles.optionDesc} onMouseEnter={handleRead}>
                                    Opção de Leitura dos textos por áudio
                                </p>
                            </div>
                        </div>

                        <input type="checkbox" className={styles.toggle} checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)} onMouseEnter={handleRead} alt="Ativar opção de leitra"/>
                    </div>


                    {/* Texto */}
                    <div className={styles.option}>
                        <div className={styles.left}>
                            <div className={styles.icon}><img src={TextIcon} className={styles.icon}></img></div>

                            <div>
                                <p className={styles.optionTitle} onMouseEnter={handleRead}>Texto</p>
                                <p className={styles.optionDesc} onMouseEnter={handleRead}>
                                    Aumentar tamanho das Fontes
                                </p>
                            </div>
                        </div>

                        <div className={styles.PlusMinus}>
                            <FontSizeControl></FontSizeControl>
                        </div>
                    </div>


                    {/* Alto contraste */}
                    <div className={styles.option}>
                        <div className={styles.left}>
                            <div className={styles.icon}><svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                            </svg></div>

                            <div>
                                <p className={styles.optionTitle} onMouseEnter={handleRead}>Alto Contraste</p>
                                <p className={styles.optionDesc} onMouseEnter={handleRead}>
                                    Ativar o Alto Contraste
                                </p>
                            </div>
                        </div>

                        <input type="checkbox" className={styles.toggle} onMouseEnter={handleRead} alt="ativar alto contraste"/>
                    </div>

                </div>

            </div>
        </>
    )
}

export { Acessibilidade }