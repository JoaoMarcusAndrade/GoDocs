import testacc from '../../assets/TestACC.png'
import { AltPerfil } from '../../components/ButtonsACC/AltPerfil'
import { HelpButton } from '../../components/ButtonsACC/HelpButton'
import { MsgButton } from '../../components/ButtonsACC/MsgButton'
import { SegurançaButton } from '../../components/ButtonsACC/SegurançaButton'
import { AtivButton } from '../../components/OtherButtonsACC/AtivButton'
import { ConfigButton } from '../../components/OtherButtonsACC/ConfigButton'
import { InfoL } from '../../components/OtherButtonsACC/InfoL'
import { SairConta } from '../../components/OtherButtonsACC/SairConta'
import style from './Conta.module.css'
const Conta = () => {
    return (
        <div>
            <div className={style.AccInformation}>
                <div className={style.AccInfos}>
                    <h1>Usuário</h1>
                    <h3>CPF</h3>
                </div>
                <img src={testacc} className={style.AccPhoto}></img>
            </div>
            <div className={style.ButtonsGrid}>
                <HelpButton></HelpButton>
                <MsgButton></MsgButton>
                <AltPerfil></AltPerfil>
                <SegurançaButton></SegurançaButton>

            </div>
            <div className={style.ButtonsList}>
                <AtivButton></AtivButton>
                <ConfigButton></ConfigButton>
                <InfoL></InfoL>
                <SairConta></SairConta>

            </div>


        </div>
    )
}

export { Conta }