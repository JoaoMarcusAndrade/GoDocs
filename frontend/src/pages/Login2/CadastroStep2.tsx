import { CabecalhoForms } from "../../components/CabecalhoForms/CabecalhoForms"
import { InputsLogin } from "../../components/InputsLogin/InputsLogin"
import style from './CadastroStep2.module.css'
const CadastroStep2 = () =>{
   return (
    <div className={style.CadastroStep2}>
     <CabecalhoForms></CabecalhoForms>
     <InputsLogin></InputsLogin>
    </div>
    

   )
}

export {CadastroStep2}