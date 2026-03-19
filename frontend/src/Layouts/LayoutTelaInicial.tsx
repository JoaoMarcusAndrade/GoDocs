import { Outlet } from "react-router-dom";
import { CabecalhoGodocs } from "../components/CabecalhoGodocs/CabecalhoGodocs";
import { ContentDIV } from "../components/ContentDIV/Content";
import style from './LayoutInit.module.css'
import { NavBottom } from "../components/NavBottom/NavBottom";

const LayoutTelaInicial = () => {
    return (
        <div className={style.LayoutInit}>
            <CabecalhoGodocs />
            <ContentDIV>
                <Outlet />
            </ContentDIV>
            <NavBottom></NavBottom>
        </div>
    )
}

export { LayoutTelaInicial }