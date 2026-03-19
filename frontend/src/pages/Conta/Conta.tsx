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
import { useEffect, useState } from 'react'

const Conta = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        console.log("userStorage:", userStorage);

        if (userStorage && userStorage !== "undefined") {
            try {
                const parsed = JSON.parse(userStorage);
                setUser(parsed);
            } catch (error) {
                console.log("Erro ao parsear user:", error);
            }
        }
    }, []);

    return (
        <div>
            <div className={style.AccInformation}>
                <div className={style.AccInfos}>

                    <h1>{user?.name || "Usuário"}</h1>
                    <h3>{user?.CPF || "CPF"}</h3>

                </div>

                <img
                    src={user?.img || testacc}
                    className={style.AccPhoto}
                />
            </div>

            <div className={style.ButtonsGrid}>
                <HelpButton />
                <MsgButton />
                <AltPerfil />
                <SegurançaButton />
            </div>

            <div className={style.ButtonsList}>
                <AtivButton />
                <ConfigButton />
                <InfoL />
                <SairConta />
            </div>
        </div>
    )
}

export { Conta }