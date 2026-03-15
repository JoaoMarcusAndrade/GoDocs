import { ButtonForms } from "../../components/ButtonForms/ButtonForms";
import { FormsInputs } from "../../components/FormsInputs/FormsInputs"
import style from './FormCadastro.module.css'
import GoDocsMobileIcon from '../../assets/LogoMobile.png'
import { TermosUso } from "../../components/TermosUso/TermosUso";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { ChooseOR } from "../../components/Choose/Choose";
import { Link } from "react-router-dom";

const Login = () => {
   return (
   <div className={style.ContainerCadastro}>
      <div className={style.DivAzulCima}></div>

      <div className={style.ConteudoCadastro}>
         <img src={GoDocsMobileIcon} className={style.GoDocsIcon}></img>

       <div className={style.DivAroundForm}>
         <h1>Login</h1>
        <FormsInputs PlaceHolderInput="Digite seu Email"></FormsInputs>
        
        <FormsInputs PlaceHolderInput="Digite sua senha"></FormsInputs>
        <Link to="/" className={style.AccQst}>Não tem conta?</Link>
       
        
         <ButtonForms ButtonFormsText="Continuar" ButtonFormsLink="/Home"></ButtonForms>
        
        <ChooseOR></ChooseOR>
        <GoogleButton></GoogleButton>
        <TermosUso></TermosUso>
       </div>
      </div>
      
   </div>
   
   )
}

export { Login };