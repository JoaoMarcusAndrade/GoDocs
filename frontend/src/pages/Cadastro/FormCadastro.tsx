import { ButtonForms } from "../../components/ButtonForms/ButtonForms";
import { FormsInputs } from "../../components/FormsInputs/FormsInputs";
import style from './FormCadastro.module.css'
import GoDocsMobileIcon from '../../assets/GoDocsMobileIcon.png'
import { TermosUso } from "../../components/TermosUso/TermosUso";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { ChooseOR } from "../../components/Choose/Choose";

const FormCadastro = () => {
   return (
   <div className={style.ContainerCadastro}>
      <div className={style.DivAzulCima}></div>

      <div className={style.ConteudoCadastro}>
         <img src={GoDocsMobileIcon} className={style.GoDocsIcon}></img>

       <div className={style.DivAroundForm}>
         <h1>Cadastro</h1>
        <FormsInputs></FormsInputs>
        <FormsInputs></FormsInputs>
        <FormsInputs></FormsInputs>
        <FormsInputs></FormsInputs>
        <ButtonForms></ButtonForms>
        <ChooseOR></ChooseOR>
        <GoogleButton></GoogleButton>
        <TermosUso></TermosUso>
       </div>
      </div>
      
   </div>
   
   )
}

export { FormCadastro };