import { NavLink } from 'react-router-dom';
import { IMainMenu } from './models';
import { ProjectComponents } from './ProjectComponents';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/userSlice';

export const MainMenu = (props: IMainMenu) => {

    const user = useSelector(selectUser);
    
    const menuElements = ProjectComponents.map((c, idx) => {
        if (c.hideInMenu) return null
        if(user == null && c.auth || (user != null && !c.auth)) return null 
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