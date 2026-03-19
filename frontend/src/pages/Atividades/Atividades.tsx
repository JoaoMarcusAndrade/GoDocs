import { AtivDiv } from "../../components/AtivDiv/AtivDiv"
import style from './Atividades.module.css'

const Atividade = () => {
    return (
        <div className={style.Atividades}>
            <div className={style.Atividadesh1texts}>
                <h1>Atividades</h1>
                <h2>Anteriores</h2>
            </div>
            <div className={style.AtivLine}></div>
            <AtivDiv></AtivDiv>
        </div>
    )

}

export { Atividade }