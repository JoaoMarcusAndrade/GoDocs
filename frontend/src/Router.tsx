import { Route, Routes } from "react-router-dom";
import { LayoutTelaInicial } from "./Layouts/LayoutTelaInicial";
import { Initial } from "./pages/Initial/Inicial";
import { Atividade } from "./pages/Atividades/Atividades";
import { Conta } from "./pages/Conta/Conta";
import { Cadastro } from "./pages/login_cadastro/FormCadastro";
import { LayoutCadastro } from "./Layouts/LayoutCadastro";
import { CadastroStep2 } from "./pages/CadastroStep2/CadastroStep2";
import { Login } from "./pages/login_cadastro/FormLogin";
import { AltConta } from "./pages/AltConta/AltConta";
import { Config } from "./pages/Config/Config";

const Router = () => {
    return (
        <Routes>

            <Route path="/" element={<LayoutCadastro />}>
                <Route index element={<Cadastro />} />
                <Route path="cadastrostep2" element={<CadastroStep2 />} />
                <Route path="login" element={<Login />} />
                <Route path="alt" element={<AltConta/>}/>
                <Route path="config" element={<Config/>}/>
                
            </Route>

            <Route path="/home" element={<LayoutTelaInicial />}>

                <Route index element={<Initial />} />

                <Route path="atividade" element={<Atividade />} />

                <Route path="conta" element={<Conta />} />


            </Route>


        </Routes>
    )
}
export { Router }