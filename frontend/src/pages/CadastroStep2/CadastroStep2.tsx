import { CabecalhoForms } from "../../components/CabecalhoForms/CabecalhoForms"
import AvatarDefaultIcon from '../../assets/IconePerfilSVG.svg'
import style from './CadastroStep2.module.css'
import { ButtonForms } from "../../components/ButtonForms/ButtonForms"
import { createAccount } from "../../services"
import { useRef } from "react"
import { useLocation } from "react-router-dom"
const CadastroStep2 = () => {
    const location = useLocation();
   const { email } = location.state || {};  // Pegando o email da navegação

   console.log("Email na CadastroStep2:", email);
  const imgInputRef = useRef<HTMLInputElement | null>(null); // Referência para o campo de imagem

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    // Podemos usar a função setState para lidar com a imagem no futuro, mas vamos continuar usando getElementById
  };

  const handleCreateAccount = async () => {
    // Pegando os dados através do getElementById
    const nameInput = document.getElementById("nameCad") as HTMLInputElement | null;
    const cpfInput = document.getElementById("CPFCad") as HTMLInputElement | null;
    const imgInput = document.getElementById("imgCad") as HTMLInputElement | null;

    if (!nameInput || !cpfInput || !imgInput) {
      console.log("Por favor, preencha todos os campos.");
      return;
    }

    const name = nameInput.value;
    const cpf = cpfInput.value;

    const file = imgInput.files?.[0];

    if (!file) {
      console.log("Está faltando uma foto");
      return;
    }

    await createAccount(name, cpf, file);  // Passa os dados para a função
  };

  return (
    <>
      <CabecalhoForms BackButtonLink="/" Tittle="Criar conta" />
      <div className={style.Cad2}>
        <div className={style.PhotoUp}>
          <img src={AvatarDefaultIcon} alt="Avatar" />
          <label className={style.botaoUpload}>
            Selecionar foto
            <input
              type="file"
              hidden
              id="imgCad"
              ref={imgInputRef}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className={style.DivInputsCad2}>
          <div className={style.IconsCad2}>
            <input
              type="text"
              className={style.InputCad2}
              placeholder="Digite seu nome"
              id="nameCad"
            />
          </div>
          <div className={style.IconsCad2}>
            <input
              type="text"
              className={style.InputCad2}
              placeholder="Digite seu CPF"
              id="CPFCad"
            />
          </div>
          <ButtonForms ButtonFormsText="Finalizar" ButtonOnClick={handleCreateAccount} />
        </div>
      </div>
    </>
  );
};

export { CadastroStep2 };