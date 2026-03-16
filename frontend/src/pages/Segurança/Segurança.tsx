import { CabecalhoGodocsBack } from '../../components/CabecalhoGoDocsBack/CabecalhoGodocs'
import style from './Segurança.module.css'

const Segurança = () => {
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/home/conta"></CabecalhoGodocsBack>
            <div className={style.Segp}>
                <div className={style.SegText}>
                    <div className={style.SegTit}>
                        <h1>Centro de Segurança</h1>
                        <h3>Verificação de Duas Etapas para a Sua Segurança</h3>
                    </div>
                    <div className={style.SegTit}>
                        <h1>Verificação em duas Etapas</h1>
                        <h3>Emails Registrados:</h3>
                    </div>

                </div>
                <div className={style.SegLine}></div>
                <div className={style.SegDiv}>
                    <div className={style.SegMailTit}>
                        <h1>Emails</h1>
                    </div>
                    <div className={style.SegLine}></div>
                    <div className={style.SegMails}><p>Jadilsondasilva@gmail.com</p></div>

                </div>
            </div>
        </>
    )
}

export { Segurança }