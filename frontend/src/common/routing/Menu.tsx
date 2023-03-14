import { NavLink } from 'react-router-dom';
import { IMainMenu } from './models';
import { ProjectComponents } from './ProjectComponents';

export const MainMenu = (props: IMainMenu) => {

    
    const menuElements = ProjectComponents.map((c, idx) => {
        if (c.hideInMenu) return null
        return <div key={idx * 27} className="menu-opt">
            <NavLink key={idx} to={c.path}>
                {c.name}
            </NavLink>
        </div>
    }).filter(c => c);

    return <div className="main-menu">
        {menuElements}
    </div>
}