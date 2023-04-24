import { useEffect, useState } from 'react';

import { AjaxLoader } from '../common/AjaxLoader';
import { PageContainer } from '../common/layouts/PageContainer';
import { callDelete, callGet, callPatch, callPost, callPostFiles, callPut } from '../common/Fetch';
import { apiRoutes } from '../common/ApiRoutes';
import { Button, FileUploader, FileUploaderDropContainer, FormItem } from 'carbon-components-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../common/Redux/Slices/userSlice';
import { ILoginInputs } from '../common/models';
import { useForm, SubmitHandler } from "react-hook-form";
import { store } from '../common/Redux/Store';

export const TestPage1 = () => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>([]),
        [isAjax, setAjax] = useState(false),
        [images, setImages] = useState<any[]>([]),
        [userToRep, setRep] = useState<any>(null),
        [checkRep, setCheckRep] = useState(false),
        [uploaded, setFiles] = useState<any[]>([]),
        { register, handleSubmit } = useForm();

    const handleButton = async () => {
        setAjax(true)
        let req = await callGet(apiRoutes.getOffers)
        setOffers(req.body as any)
        console.log(offers);
        setAjax(false)

    }
    const handleButton2 = async (offer: any) => {
        setAjax(true)
        let req = await callGet(apiRoutes.getSingle + `/${offer.id}`)
        setOffers([req.body] as any)
        console.log(offers);
        setAjax(false)

    }
    const handleButtonTest = async () => {
        setAjax(true)

        let body = {
            title: "test",
            description: "test test",
            category: "kategoria1",
            date: new Date()
        }
        let req = await callPost(apiRoutes.addOffer + `/${user.email}`, body)
        handleButton()
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
        let req = await callPatch(apiRoutes.updateOffer + `/${user.email}` + `/${offer.id}`, body)

        handleButton()
    }
    const handleDelete = async (offer: any) => {
        let req = await callDelete(apiRoutes.deleteOffer + `/${user.email}` + `/${offer.id}`, null)

        handleButton()
    }
    const handleDeactivate = async (offer: any) => {
        let req = await callPatch(apiRoutes.deactivateOffer + `/${user.email}` + `/${offer.id}`, null)

        handleButton()
    }
    const handleSubmitCustom = async (e: any, offer: any) => {
        e.preventDefault()
        let req = await callPostFiles(apiRoutes.uploadFile + `/${user.email}` + `/${offer.id}`, uploaded)
    }
    const handleFileAdd = (event: any, file: any) => {
        let tmpUpload = [...uploaded]
        tmpUpload.push(file.addedFiles[0])
        console.log(file.addedFiles[0])
        setFiles(tmpUpload)
    }
    const handleAllImages = async (offer: any) => {
        let req = await callGet(apiRoutes.getOfferFiles + `/${offer.id}`)
        console.log(req.body)
        setImages(req.body as any);
    }
    const handleSingleImg = async (image: any) => {
        let req = await callGet(apiRoutes.downloadFile + `/${image.type}/${image.id}`)
        console.log(req);
        setImages([req.body as any])
    }
    const getRepUser = async () => {
        let req = await callGet(apiRoutes.user + `/user@1.pl`)
        setRep(req.body);
    }
    const checkRepepd = async () => {
        let req = await callGet(apiRoutes.isUserRep + `/${user.email}/user@1.pl`)
        setCheckRep(req.body as any);
        console.log("XDD", req);
    }
    const repuser = async (userToRep: any) => {
        let req = await callPost(apiRoutes.userRep + `/${user.email}/${userToRep.email}`, null)
        console.log(req);
    }
    useEffect(() => {
        getRepUser();
        checkRepepd();
    }, [])
    return <PageContainer>
        <h1 >Test page1</h1>

        <AjaxLoader isAjax={isAjax}>
            <div className="obrazki">
                <Button onClick={handleButton}>Get all offers!</Button>
                <Button onClick={handleButtonTest}>Add test offer!</Button>
            </div>
            <div className="obrazki">
                {offers.length > 0 && <form onSubmit={(e) =>handleSubmitCustom(e, offers[0])}>
                    <FormItem>
                        <FileUploaderDropContainer
                            accept={[
                                'image/jpeg',
                                'image/png'
                            ]}
                            // itemRef={'[Circular]'}
                            labelText={`Drag and drop files here or click to upload files for offer ${offers[0].id}`}
                            multiple
                            onAddFiles={(e, x) => handleFileAdd(e, x)}
                            onChange={(e) => { console.log(e) }}
                            tabIndex={0}

                        />
                        <div className="uploaded-files">
                            {uploaded.map((f, idx) => <p key={"f" + idx}>{f.name}</p>)}
                        </div>
                    </FormItem>
                    <Button type='submit'>Wylij plik</Button>
                </form>}
                {offers.length > 0 && <Button onClick={() => handleAllImages(offers[0])}>GetImages</Button>}
                {userToRep && <div className="user-rep">
                    <p>Sample user: {userToRep.email}</p>
                    <p>Rep: {userToRep.votes}</p>
                    {!checkRep && <Button onClick={() => repuser(userToRep)}>+1</Button>}
                </div>}
            </div>


        </AjaxLoader>
        {offers && <div className='obrazki'>
            {offers.map((o, idx) =>
                <div onClick={() => handleButton2(o)} className={o.active ? "active" : "inactive"} key={idx}>
                    <p key={"xxz" + idx}>{o.id}</p>
                    <p key={"xxxs" + idx}>{o.title}</p>
                    <p key={"xxxxq" + idx}>{o.description}</p>
                    <Button key={"x" + idx} onClick={() => handleEdit(o)}>Edit</Button>
                    {!o.deleted && <Button key={"xx" + idx} onClick={() => handleDelete(o)}>Delete</Button>}
                    {o.active ?
                        <Button key={"xxxz" + idx} onClick={() => handleDeactivate(o)}>Deactivate</Button>
                        :
                        <Button key={"xxy" + idx} onClick={() => handleDeactivate(o)}>Activate</Button>
                    }
                </div>
            )}
        </div>}
        {images && <div className='obrazki'>
            {images.map((i, idx) => <div onClick={() => handleSingleImg(i)} key={"zz" + idx} className="img-container">
                <img key={"zzz" + idx} src={`data:${i.type};base64, ${i.fileData}`} alt="" />
            </div>)}
        </div>}
    </PageContainer>
}

