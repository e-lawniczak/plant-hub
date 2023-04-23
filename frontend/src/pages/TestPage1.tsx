import { useState } from 'react';

import { AjaxLoader } from '../common/AjaxLoader';
import { PageContainer } from '../common/layouts/PageContainer';
import { callDelete, callGet, callPatch, callPost, callPostFiles } from '../common/Fetch';
import { apiRoutes } from '../common/ApiRoutes';
import { Button, FileUploader, FileUploaderDropContainer, FormItem } from 'carbon-components-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../common/Redux/Slices/userSlice';
import { ILoginInputs } from '../common/models';
import { useForm, SubmitHandler } from "react-hook-form";
import { store } from '../common/Redux/Store';

export const TestPage1 = () => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>(),
        [isAjax, setAjax] = useState(false),
        [uploaded, setFiles] = useState<any[]>([]),
        { register, handleSubmit } = useForm();

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
    const handleSubmitCustom = async (e: any) => {
        e.preventDefault()
        let req = await callPostFiles(apiRoutes.uploadFile, uploaded)
        console.log(req)
        console.log(req.body)
    }
    const handleFileAdd = (event: any, file: any) => {
        let tmpUpload = [...uploaded]
        tmpUpload.push(file.addedFiles[0])
        console.log(file.addedFiles[0])
        setFiles(tmpUpload)
    }
    console.log()
    return <PageContainer>
        <h1 >Test page1</h1>

        <AjaxLoader isAjax={isAjax}>
            <Button onClick={handleButton}>Click me!</Button>
            <Button onClick={handleButton2}>Get 5!</Button>
            <Button onClick={handleButtonTest}>Add test!</Button>
            <form onSubmit={handleSubmitCustom}>
                <FormItem>
                    <FileUploaderDropContainer
                        accept={[
                            'image/jpeg',
                            'image/png'
                        ]}
                        // itemRef={'[Circular]'}
                        labelText="Drag and drop files here or click to upload"
                        multiple
                        onAddFiles={(e, x) => handleFileAdd(e, x)}
                        onChange={(e) => { console.log(e) }}
                        tabIndex={0}

                    />
                    <div className="uploaded-files">
                        {uploaded.map(f => <p>{f.name}</p>)}
                    </div>
                </FormItem>
                <Button type='submit'>Wylij plik</Button>
            </form>

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

