import { ButtonForms } from "../../components/ButtonForms/ButtonForms";
import { FormsInputs } from "../../components/FormsInputs/FormsInputs"
import style from './FormCadastro.module.css'
import GoDocsMobileIcon from '../../assets/LogoMobile.png'
import { TermosUso } from "../../components/TermosUso/TermosUso";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { ChooseOR } from "../../components/Choose/Choose";
import { Link } from "react-router-dom";
import { authEmailBtn } from "../../services/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Cadastro = () => {

   const [email, setEmail] = useState("");  // Estado para armazenar o email
   const navigate = useNavigate();

   // Função para lidar com o clique no botão "Continuar"
   const handleCadastro = async () => {
      // Aqui você pode chamar a função authEmailBtn ou fazer outras ações
      const res = await authEmailBtn();

      if (res) {
         // Passando o email para a página FA2
         navigate("/fa2", { state: { email } });
      }
   }
   return (
      <div className={style.ContainerCadastro}>
         <div className={style.DivAzulCima}></div>

         <div className={style.ConteudoCadastro}>
            <img src={GoDocsMobileIcon} className={style.GoDocsIcon}></img>

            <div className={style.DivAroundForm}>
               <h1>Cadastro</h1>
               <FormsInputs PlaceHolderInput="Digite seu Email" IdInput="emailCad" value={email}  // Vinculando o valor do input ao estado
                  onChange={(e) => setEmail(e.target.value)}></FormsInputs>
               <FormsInputs PlaceHolderInput="Digite seu telefone" IdInput="phoneCad"></FormsInputs>
               <FormsInputs PlaceHolderInput="Digite sua senha" IdInput="passCad"></FormsInputs>
               <FormsInputs PlaceHolderInput="Confirme sua senha" ></FormsInputs>
               <Link to="login" className={style.AccQst}>Já tem conta?</Link>

               <ButtonForms ButtonFormsText="Continuar" ButtonOnClick={handleCadastro}></ButtonForms>

               <ChooseOR></ChooseOR>
               <GoogleButton></GoogleButton>
               <TermosUso></TermosUso>

            </div>
         </div>

      </div>


   )
}

export { Cadastro };