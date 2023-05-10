import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { callDelete, callGet, callPatch, callPost, callPostFiles } from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader"
import edit from '../../common/img/edit.svg';
import deleteImg from '../../common/img/delete.svg';
import activate from '../../common/img/activate.svg';
import deactivate from '../../common/img/deactivate.svg';
import { apiRoutes } from "../../common/ApiRoutes";
import { useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, FileUploaderDropContainer, FormItem, TextArea, TextInput } from "carbon-components-react";
import { IOfferInputs, Offer, OfferData } from "./models";
import { useForm } from "react-hook-form";

const categories = [
    { id: '1', text: "Pot plant" },
    { id: '2', text: "Garden plant" },
    { id: '3', text: "Small plant" },
    { id: '4', text: "Big plant" },
    { id: '5', text: "Medium plant" },
    { id: '6', text: "Field plant" },
    { id: '7', text: "Decoration" },
    { id: '8', text: "Other" },
]

export const OfferPage = () => {

    const
        navigate = useNavigate(),
        dispatch = useDispatch(),
        user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        [isOfferOwner, setIsOwner] = useState(false),
        [offer, setOffer] = useState<Offer>((null) as any),
        [images, setUploaded] = useState<any[]>(),
        { register, handleSubmit } = useForm<IOfferInputs>(),
        [uploaded, setFiles] = useState<any[]>([]),
        { userId, id } = useParams(),
        getOffer = async () => {
            setAjax(true);
            let req = await callGet(apiRoutes.getSingle + `/${id}`);
            console.log(req.body);
            if (req.ok) {
                setOffer((req.body as any))
                let reqImg = await callGet(apiRoutes.getOfferFiles + `/${id}`)
                if (reqImg.ok) {
                    setUploaded((reqImg.body as any))
                }
                if ((req.body as unknown as Offer).user.id === user.id) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
            setAjax(false);

        },
        handleDeactivate = async (offer: Offer) => {
            if (!isOfferOwner) return;
            let req = await callPatch(apiRoutes.deactivateOffer + `/${offer.user.email}` + `/${offer.id}`, null)
            if (req.ok) {
                getOffer();
            }
        },
        handleDelete = async (offer: Offer) => {
            if (!isOfferOwner) return;
            let req = await callDelete(apiRoutes.deleteOffer + `/${offer.user.email}` + `/${offer.id}`, null)
            if (req.ok) {
                navigate("/offers")
            }
        },
        handleForm = async (data: any) => {
            if (!isOfferOwner) return;
            let req = await callPostFiles(apiRoutes.uploadFile + `/${user.email}` + `/${offer.id}`, uploaded)
            if (req.ok) {
                getOffer();
                setUploaded([])
            }
        },
        handleFileAdd = (event: any, file: any) => {
            if (!isOfferOwner) return;
            let tmpUpload = [...uploaded]
            tmpUpload.push(file.addedFiles[0])
            console.log(file.addedFiles[0])
            setFiles(tmpUpload)
        },
        removeFile = (id: number) => {
            if (!isOfferOwner) return;
            let tmp = uploaded.filter((i, idx) => idx !== id);
            setFiles(tmp);
        },
        deleteImgFromOffer = async (i: any) => {
            let req = await callDelete(apiRoutes.deleteFileFromOffer + `/${user.email}/${offer.id}/${i.id}`, null);
            console.log(req);
            if (req.ok) {
                getOffer();
            }
        },
        handleEdit = (offer: Offer) => {
            throw new Error("Function not implemented.");
        }



    useEffect(() => {
        getOffer()
    }, [])


    return <PageContainer className="offer-page" title={`Offer ${offer ? "#" + offer?.id : ""} ${offer ? offer?.title : ""}`}>
        <AjaxLoader isAjax={isAjax}>
            <div className="offer-col col">
                <div className="offer-info">
                    {isOfferOwner &&
                        <div className="offer-opt">
                            <h5>{offer?.active ? "Offer is active" : "Offer is inactive"}</h5>
                            <Button onClick={() => handleDeactivate(offer)}>{offer?.active ? "Activate" : "Deactivate"}</Button>
                            <div className="img-container icon edit" onClick={() => handleEdit(offer)}>
                                <img src={edit} alt="" />
                            </div>
                            <div className="img-container icon delete" onClick={() => handleDelete(offer)}>
                                <img src={deleteImg} alt="" />
                            </div>
                        </div>}
                    <div className="text">
                        <h4>Description</h4>
                        <p>
                            {offer?.description}
                        </p>
                        <h4>Category</h4>
                        <p>
                            {offer?.category}
                        </p>
                    </div>
                    <h4>Photos</h4>
                    <div className={`images ${isOfferOwner ? "grid-2" : "grid-1"}`}>
                        {images && <div className='mini-imgs'>
                            {images.map((i, idx) => <div key={"zz" + idx} className="mini-img">
                                {isOfferOwner && <div className="overlay" onClick={() => deleteImgFromOffer(i)}>X</div>}
                                <div className="img-container">
                                    <img key={"zzz" + idx} src={`data:${i.type};base64, ${i.fileData}`} alt="" />
                                </div>
                            </div>)}
                        </div>}
                        {isOfferOwner &&
                            <div className="upload-img">
                                <form onSubmit={handleSubmit((data) => handleForm(data))}>
                                    <FormItem>
                                        <FileUploaderDropContainer
                                            accept={[
                                                'image/jpeg',
                                                'image/png'
                                            ]}
                                            labelText={`Drag and drop files here or click to upload files for offer`}
                                            multiple
                                            onAddFiles={(e, x) => handleFileAdd(e, x)}
                                            onChange={(e) => { console.log(e) }}
                                            tabIndex={0}

                                        />
                                    </FormItem>
                                    {uploaded.length > 0 && <Button type='submit'>Dodaj zdjęcia</Button>}
                                </form>
                                <div className="uploaded-files">
                                    {uploaded.map((f, idx) => <div className="mini-img" key={"f" + idx}>
                                        <div className=" img-container">
                                            {/* <img src={`data:${f};base64, ${f.fileData}`} alt={f.name} /> */}
                                            <img src={`${URL.createObjectURL(f)}`} alt={f.name} />
                                        </div>
                                        <div className="file-opt">
                                            <p>{f.name}</p>
                                            <div className="delete-file" onClick={() => removeFile(idx)}>x</div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </AjaxLoader>
        <AjaxLoader isAjax={isAjax} >
            <div className="user-col col">
                <div className="user-info"></div>
            </div>
        </AjaxLoader>
    </PageContainer>
}

