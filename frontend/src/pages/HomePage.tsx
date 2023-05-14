import { Button, DatePicker, DatePickerInput } from 'carbon-components-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AjaxLoader } from '../common/AjaxLoader';
import { apiRoutes } from '../common/ApiRoutes';
import { callPost } from '../common/Fetch';
import { PageContainer } from '../common/layouts/PageContainer';
import { logout, selectUser } from '../common/Redux/Slices/userSlice';

export const HomePage = (props: any) => {

    const user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        navigate = useNavigate(),
        dispatch = useDispatch();


    const handleClick = async () => {
        if (user) {
            setAjax(true)
            await callPost(apiRoutes.user + '/' + user.email + '/logout', null, user.accessToken, false)
            setAjax(false)
            dispatch(logout())
            navigate('/');
        }
    }

    return <PageContainer title={`Strona główna`}>
        Strona główna Używamy Carbona btw
        <p>
            <a href="https://carbondesignsystem.com/">https://carbondesignsystem.com/</a>
        </p>
        <p>
            <a href="https://react.carbondesignsystem.com/?path=/docs/components-button--default">Komponenty</a>
        </p>
        {user !== null ? <AjaxLoader isAjax={isAjax}><Button onClick={handleClick}>Wyloguj</Button></AjaxLoader> : " niezalogowany"}
        
    </PageContainer>
}
