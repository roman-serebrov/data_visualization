import ActionMenu from "../ActionMenu";
import './header.css';
import ToolBar from "../ToolBar";
import {useState} from "react";

// @ts-ignore
function Header({handlerChart, handlerLoading}) {
    const [viewToolBar, setViewToolBar] = useState(false);
    const handlerClickActionMenu = () => {
        if(viewToolBar) setViewToolBar(false)
        else setViewToolBar(true);
    }
    return (
        <div className={'header__content'}>
            {viewToolBar &&
            <ToolBar
                handlerChart={handlerChart}
                handlerLoading={handlerLoading}
            />
        }
           <header>
               <ActionMenu
                   handlerClickActionMenu={handlerClickActionMenu}
               />
           </header>
        </div>
    )    
}



export default Header;