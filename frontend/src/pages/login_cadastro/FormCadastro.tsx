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
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [email, setEmail] = useState("");  // Estado para armazenar o email

   const navigate = useNavigate();
   const [errors, setErrors] = useState<string[]>([]);

   const validatePassword = (password: string) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
      return regex.test(password);
   };

   // Função para lidar com o clique no botão "Continuar"
   const handleCadastro = async () => {
      const newErrors: string[] = [];

      // 🔹 valida senha
      if (!validatePassword(password)) {
         newErrors.push("A senha deve ter letra maiúscula, número e caractere especial");
      }

      // 🔹 confirma senha
      if (password !== confirmPassword) {
         newErrors.push("As senhas não coincidem");
      }

      // 🔹 se tiver erros → mostra e para
      if (newErrors.length > 0) {
         setErrors(newErrors);
         return;
      }

      // 🔹 limpa erros se passou
      setErrors([]);

      // 🔹 segue fluxo normal
      const res = await authEmailBtn();

      if (res) {
         navigate("/fa2", { state: { email } });
      }
   };

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
               <FormsInputs
                  PlaceHolderInput="Digite sua senha"
                  IdInput="passCad"
                  TypeInput="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               <FormsInputs
                  PlaceHolderInput="Confirme sua senha"
                  TypeInput="password"
                  IdInput="conpassCad"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               <div>
                  {errors.map((err, index) => (
                     <p key={index} style={{ color: "red" }}>
                        {err}
                     </p>
                  ))}
               </div>
               <Link to="/login" className={style.AccQst}>Já tem conta?</Link>

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