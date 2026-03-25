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
import { FA2 } from "./pages/FA2/Fa2";
import { Loc } from "./pages/Loc/Loc";
import { Acessibilidade } from "./pages/Acessibilidade/Acessibilidade";
import { Mensagens } from "./pages/Mensagens/Mensagens";
import { InfoLegais } from "./pages/InfoLegais/InfoLegais";
import { Segurança } from "./pages/Segurança/Segurança";
import { Delivery } from "./pages/Delivery/Delivery";
import { DeliveryStep2 } from "./pages/Delivery/DeliveryStep2";
import { DeliveryStep3 } from "./pages/Delivery/DeliveryStep3";



const Router = () => {

    return (
        <Routes>

            <Route path="/" element={<LayoutCadastro />}>
                <Route index element={<Login />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="cadastrostep2" element={<CadastroStep2 />} />
                <Route path="login" element={<Login />} />  
                <Route path="alt" element={<AltConta/>}/>
                <Route path="config" element={<Config/>}/>
                <Route path="fa2" element={<FA2/>}/>
                <Route path="loc" element={<Loc/>}/>
                <Route path="acessibilidade" element={<Acessibilidade/>}/>
                <Route path="msg" element={<Mensagens/>}/>
                <Route path="infoLegais" element={<InfoLegais/>}/>
                <Route path="seg" element={<Segurança/>}/>
                <Route path="delivery" element={<Delivery/>}/>
                <Route path="delistep2" element={<DeliveryStep2></DeliveryStep2>}/>
                <Route path="delistep3" element={<DeliveryStep3></DeliveryStep3>}/>
                
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