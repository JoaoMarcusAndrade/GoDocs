import { AtivDiv } from "../../components/AtivDiv/AtivDiv"
import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import style from './Mensagens.module.css'

const Mensagens = () => {
    return (
        <>
        <CabecalhoGodocsBack cabecalhoGodocsLink="/home/conta"></CabecalhoGodocsBack>
        <div className={style.Atividades}>
            <div className={style.Atividadesh1texts}>
                <h1>Mensagens</h1>
      
            </div>
            <div className={style.AtivLine}></div>
            <AtivDiv></AtivDiv>
        </div>
        </>
    )

}

export { Mensagens }