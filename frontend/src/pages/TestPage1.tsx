import { useState } from 'react';

import { AjaxLoader } from '../common/AjaxLoader';
import { PageContainer } from '../common/layouts/PageContainer';
import { callDelete, callGet, callPatch, callPost } from '../common/Fetch';
import { apiRoutes } from '../common/ApiRoutes';
import { Button } from 'carbon-components-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../common/Redux/Slices/userSlice';

export const TestPage1 = () => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>(),
        [isAjax, setAjax] = useState(false);
    const handleButton = async () => {
        setAjax(true)
        let req = await callGet(apiRoutes.getOffers)
        setOffers(req.body as any)
        console.log(offers);
        setAjax(false)

    }
    const handleButton2 = async () => {
        setAjax(true)
        let req = await callGet(apiRoutes.getSingle + `/${5}`)
        setOffers([req.body] as any)
        console.log(offers);
        setAjax(false)

    }
    const handleButtonTest = async () => {
        setAjax(true)

        let body = {
            email: user?.email || "",
            title: "test",
            description: "test test",
            category: "kategoria1",
            date: new Date()
        }
        let req = await callPost(apiRoutes.addOffer, body)
        console.log(req);
        setAjax(false)

    }
    const handleEdit = async (offer: any) => {
        console.log(offer);

        let body = {
            title: offer.title,
            description: offer.description + "t",
            category: offer.category,
            active: offer.active
        }
        let req = await callPatch(apiRoutes.updateOffer + `/${offer.id}`, body)

        handleButton()
    }
    const handleDelete = async (offer: any) => {
        console.log(offer);

        let req = await callDelete(apiRoutes.deleteOffer + `/${offer.id}`, null)

        handleButton()
    }

    return <PageContainer>
        <h1 >Test page1</h1>

        <AjaxLoader isAjax={isAjax}>
            <Button onClick={handleButton}>Click me!</Button>
            <Button onClick={handleButton2}>Get 5!</Button>
            <Button onClick={handleButtonTest}>Add test!</Button>

        </AjaxLoader>
        {offers && <>
            {offers.map((o, idx) => <div key={idx}>
                <p>{o.title}</p>
                <p>{o.description}</p>
                <Button onClick={() => handleEdit(o)}>Edit</Button>
                {!o.deleted && <Button onClick={() => handleDelete(o)}>Delete</Button>}
            </div>)}
        </>}
    </PageContainer>
}

