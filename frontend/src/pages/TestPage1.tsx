import { useState } from 'react';

import { AjaxLoader } from '../common/AjaxLoader';
import { PageContainer } from '../common/layouts/PageContainer';
import { callGet, callPost } from '../common/Fetch';
import { apiRoutes } from '../common/ApiRoutes';
import { Button } from 'carbon-components-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../common/Redux/Slices/userSlice';

export const TestPage1 = () => {

    const user = useSelector(selectUser),
     [isAjax, setAjax] = useState(false);
    const handleButton = async () => {
        setAjax(true)
    
        let req = await callGet(apiRoutes.getOffers)
        console.log(req);
        setAjax(false)

    }
    const handleButtonTest = async () => {
        setAjax(true)
    
        let body = {
            email: user?.email || "",
            title: "test",
            description:"test test",
            category: "kategoria1",
            date: new Date()
        }
        let req = await callPost(apiRoutes.addOffer, body)
        console.log(req);
        setAjax(false)

    }

    return <PageContainer>
        <h1 >Test page1</h1>

        <AjaxLoader isAjax={isAjax}>
            <Button onClick={handleButton}>Click me!</Button>
            <Button onClick={handleButtonTest}>Add test!</Button>
        </AjaxLoader>
    </PageContainer>
}

