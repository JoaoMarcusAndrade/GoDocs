import { Outlet } from "react-router-dom"
import { ContentDIV } from "../components/ContentDIV/Content"

const LayoutCadastro = () =>{
     return(
        <div>
        <ContentDIV>
            <Outlet></Outlet>
        </ContentDIV>
        </div>
     )
}

export {LayoutCadastro}