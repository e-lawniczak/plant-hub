import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { callDelete, callPost, callPostFiles } from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { useState } from "react";
import { Button, Checkbox, Dropdown, FileUploaderDropContainer, FormItem, TextArea, TextInput } from "carbon-components-react";
import { IOfferInputs, OfferData } from "./models";
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

export const CreateOffer = () => {

    const
        navigate = useNavigate(),
        dispatch = useDispatch(),
        user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        [formData, setFormData] = useState<OfferData>({ category: "", date: new Date(), description: "", title: "" }),
        [currentItem, setCurrentItem] = useState(),
        { register, handleSubmit } = useForm<IOfferInputs>(),

        [uploaded, setFiles] = useState<any[]>([]),

        handleFileAdd = (event: any, file: any) => {
            let tmpUpload = [...uploaded]
            tmpUpload.push(file.addedFiles[0])
            console.log(file.addedFiles[0])
            setFiles(tmpUpload)
        },
        handleForm = async (data: any) => {
            setAjax(true)
            let body = {
                date: new Date(),
                filesReq: uploaded,
                ...data
            } as OfferData
            body.category = formData.category;
            let req = await callPost(apiRoutes.addOffer + `/${user.email}`, body)
            console.log(req);
            if (req.ok) {
                let addImg = await callPostFiles(apiRoutes.uploadFile + `/${user.email}` + `/${(req.body)}`, uploaded)
                console.log(addImg);
            }
            setAjax(false);
        },
        handleDropdown = (item: { id: string, text: string }) => {
            console.log(item);
            let tmp = { ...formData }
            tmp.category = item.text;
            setFormData(tmp);
            setCurrentItem(item as any)
        },
        removeFile = (id: number) => {
            let tmp = uploaded.filter((i, idx) => idx !== id);
            setFiles(tmp);
        }


    return <PageContainer className="offer-create" title="Add offer">
        <form onSubmit={handleSubmit((data) => handleForm(data))}>
            <FormItem>
                <TextInput id={"title"} labelText={"Title"} placeholder="title" {...register("title")} />
            </FormItem>
            <FormItem>
                <TextArea id={"description"} labelText={"Description"} maxCount={1000} enableCounter placeholder="description" {...register("description")} />
            </FormItem>
            <FormItem>
                <Dropdown items={categories} id="categoryDropdown" label={"Pick category"} placeholder="pick category" itemToString={(item) => (item ? item.text : '')} onChange={({ selectedItem }) => handleDropdown(selectedItem as any)} />
            </FormItem>
            <FormItem>
                <Checkbox id={"active"} labelText={"Activate offer?"} {...register("active")} />
            </FormItem>
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
            <Button type='submit'>Dodaj ofertę</Button>
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
    </PageContainer>
}

