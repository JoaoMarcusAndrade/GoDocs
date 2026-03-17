import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CabecalhoForms } from "../../components/CabecalhoForms/CabecalhoForms"
import styles from "./Fa2.module.css"
import { FA2Verify } from "../../services/index"
import { useLocation } from "react-router-dom"



const FA2 = () => {
  const navigate = useNavigate();
  
  // Pegando o estado da navegação (email)
  const location = useLocation();
  const { email } = location.state || {};  // Pegando o email passado de Cadastro
  
  console.log("Email na FA2:", email);  // Verificando se o email está correto

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every(num => num !== "")) {
      verifyCode(newCode.join(""));  // Envia o código preenchido para verificação
    }
  };

  const verifyCode = async (finalCode: string) => {
    // Verificando o código e o email
    const res = await FA2Verify(finalCode, email);

    console.log(res);
    if (!res?.error) {
      navigate("/cadastrostep2", { state: { email } });  // Redirecionando para a próxima etapa após sucesso
    } else {
      console.log(res.error);  // Exibindo o erro caso haja
    }
  };

  return (
    <>
      <CabecalhoForms BackButtonLink="/" Tittle="Verificação de duas etapas" />

      <div className={styles.container}>
        <p className={styles.text}>
          Enviamos um código de segurança de 6 dígitos para seu email:
        </p>

        <p className={styles.email}>
          {email} {/* Exibindo o email passado para garantir que está correto */}
        </p>

        <p className={styles.subtitle}>Digite seu Código abaixo.</p>

        <div className={styles.codeInputs}>
          {code.map((num, index) => (
            <input
              key={index}
              value={num}
              maxLength={1}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button className={styles.resend}>Reenviar código</button>
      </div>
    </>
  );
};

export { FA2 };

