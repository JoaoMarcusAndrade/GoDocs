import { ButtonForms } from "../../components/ButtonForms/ButtonForms";
import { FormsInputs } from "../../components/FormsInputs/FormsInputs"
import style from './FormCadastro.module.css'
import GoDocsMobileIcon from '../../assets/LogoMobile.png'
import { TermosUso } from "../../components/TermosUso/TermosUso";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { ChooseOR } from "../../components/Choose/Choose";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginBtn } from "../../services";
const Login = () => {

   const navigate = useNavigate()

   const handleLogin = async () => {
      const res = await loginBtn()

      if (res) {
         // Passando o email para a página FA2
         const email = document.getElementById("emailCad")?.value;  // Capturando o email
         navigate("/fa2", { state: { email } });  // Passando o email para FA2 via state
      }
   }

   return (
      <div className={style.ContainerCadastro}>
         <div className={style.DivAzulCima}></div>

         <div className={style.ConteudoCadastro}>
            <img src={GoDocsMobileIcon} className={style.GoDocsIcon} />

            <div className={style.DivAroundForm}>
               <h1>Login</h1>

               <FormsInputs PlaceHolderInput="Digite seu Email" IdInput="emailLog" />
               <FormsInputs PlaceHolderInput="Digite sua senha" IdInput="passLog" />

               <Link to="/" className={style.AccQst}>Não tem conta?</Link>

               <ButtonForms
                  ButtonFormsText="Continuar"
                  ButtonOnClick={handleLogin}
               />

               <ChooseOR />
               <GoogleButton />
               <TermosUso />

            </div>
         </div>
      </div>
   )
}

export { Login };