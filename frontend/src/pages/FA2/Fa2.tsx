import { CabecalhoForms } from "../../components/CabecalhoForms/CabecalhoForms"
import styles from './Fa2.module.css'

const FA2 = () =>{
   return (
    <>
     <CabecalhoForms BackButtonLink="/" Tittle="Verificação de duas etapas"></CabecalhoForms>

    <div className={styles.container}>
      
      <p className={styles.text}>
        Enviamos um código de segurança de 6 dígitos para seu email:
      </p>

      <p className={styles.email}>
        exemplo@gmail.com
      </p>

      <p className={styles.subtitle}>
        Digite seu Código abaixo.
      </p>

      <div className={styles.codeInputs}>
        <input type="text" maxLength={1} />
        <input type="text" maxLength={1} />
        <input type="text" maxLength={1} />
        <input type="text" maxLength={1} />
        <input type="text" maxLength={1} />
        <input type="text" maxLength={1} />
      </div>

      <button className={styles.resend}>
        Reenviar código
      </button>

    </div>   
    </>
   )
}

export {FA2};