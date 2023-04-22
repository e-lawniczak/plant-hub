import { useState } from 'react';

import { AjaxLoader } from '../common/AjaxLoader';
import { PageContainer } from '../common/layouts/PageContainer';

export const TestPage1 = () => {

    const [isAjax, setAjax] = useState(false);
    const handleButton = async () => {
        setAjax(true)
    
        //let req = await callGet(apiRoutes.testMethod)
        setAjax(false)

    }

    return <PageContainer>
        <h1 >Test page1</h1>

        <AjaxLoader isAjax={isAjax}>
            <button onClick={handleButton}>Click me!</button>
        </AjaxLoader>
    </PageContainer>
}

