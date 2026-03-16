import { ButtonForms } from "../../components/ButtonForms/ButtonForms";
import { FormsInputs } from "../../components/FormsInputs/FormsInputs"
import style from './FormCadastro.module.css'
import GoDocsMobileIcon from '../../assets/LogoMobile.png'
import { TermosUso } from "../../components/TermosUso/TermosUso";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { ChooseOR } from "../../components/Choose/Choose";
import { Link } from "react-router-dom";
import { authEmailBtn } from "../../services/index";

const Cadastro = () => {
   return (
   <div className={style.ContainerCadastro}>
      <div className={style.DivAzulCima}></div>

      <div className={style.ConteudoCadastro}>
         <img src={GoDocsMobileIcon} className={style.GoDocsIcon}></img>

       <div className={style.DivAroundForm}>
         <h1>Cadastro</h1>
        <FormsInputs PlaceHolderInput="Digite seu Email" IdInput="emailCad"></FormsInputs>
        <FormsInputs PlaceHolderInput="Digite seu telefone" IdInput="phoneCad"></FormsInputs>
        <FormsInputs PlaceHolderInput="Digite sua senha" IdInput="passCad"></FormsInputs>
        <FormsInputs PlaceHolderInput="Confirme sua senha" ></FormsInputs>
        <Link to="login" className={style.AccQst}>Já tem conta?</Link>
        
         <ButtonForms ButtonFormsText="Continuar" ButtonFormsLink="fa2" ButtonOnClick={authEmailBtn}></ButtonForms>
        
        <ChooseOR></ChooseOR>
        <GoogleButton></GoogleButton>
        <TermosUso></TermosUso>
       </div>
      </div>
      
   </div>
   
   
   )
}

export { Cadastro };