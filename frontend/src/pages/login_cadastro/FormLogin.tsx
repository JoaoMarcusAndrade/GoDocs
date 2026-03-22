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
      const data = await loginBtn();

      if (!data) {
         console.log("Erro no login");
         return;
      }

      // 👇 aqui depende do que seu backend retorna
      if (data.token || data.user) {
         console.log("Login OK");

         localStorage.setItem("user", JSON.stringify(data.user));
         console.log("USER QUE VAI SALVAR:", data.user);

         navigate("/home"); // 🚀 redireciona
      } else {
         console.log("Email ou senha inválidos");
      }
   };

   return (
      <div className={style.ContainerCadastro}>
         <div className={style.DivAzulCima}></div>

         <div className={style.ConteudoCadastro}>
            <img src={GoDocsMobileIcon} className={style.GoDocsIcon} />

            <div className={style.DivAroundForm}>
               <h1>Login</h1>

               <FormsInputs PlaceHolderInput="Digite seu Email" IdInput="emailLog" />
               <FormsInputs PlaceHolderInput="Digite sua senha" IdInput="passLog" TypeInput="password"/>

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