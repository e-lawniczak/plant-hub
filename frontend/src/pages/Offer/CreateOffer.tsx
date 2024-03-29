import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  callGet,
  callPatch,
  callPost,
  callPostFiles,
} from "../../common/Fetch";
import { apiRoutes } from "../../common/ApiRoutes";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  FileUploaderDropContainer,
  FormItem,
  TextArea,
  TextInput,
} from "carbon-components-react";
import { ICategoryData, IOfferInputs, IOffer, IOfferData } from "./models";
import { useForm } from "react-hook-form";

export const CreateOffer = (props: {
  isEdit?: boolean;
  offer?: IOffer;
  getOffer?: any;
  setEdit?: any;
}) => {
  const {
    isEdit = false,
    offer = null,
    getOffer = () => { },
    setEdit = () => { },
  } = props,
    user = useSelector(selectUser),
    [isAjax, setAjax] = useState(false),
    navigate = useNavigate(),
    [formData, setFormData] = useState<IOfferData>({
      category: "",
      date: new Date(),
      description: "",
      title: "",
    }),
    [categories, setCategories] = useState<ICategoryData[]>([]),
    [currentItem, setCurrentItem] = useState(),
    { register, handleSubmit, setValue } = useForm<IOfferInputs>(),
    [uploaded, setFiles] = useState<any[]>([]),
    handleFileAdd = (event: any, file: any) => {
      let tmpUpload = [...uploaded];
      tmpUpload.push(file.addedFiles[0]);
      setFiles(tmpUpload);
    },
    handleForm = async (data: any) => {
      setAjax(true);
      if(!formData.category) return;
      let body = {
        date: new Date(),
        filesReq: uploaded,
        ...data,
      } as IOfferData;
      body.category = formData.category;
      let req;
      if (isEdit && !!offer) {
        req = await callPatch(
          apiRoutes.updateOffer + `/${user.email}` + `/${offer?.id}`,
          body
        );
        getOffer();
        setEdit(false);
      } else {
        req = await callPost(apiRoutes.addOffer + `/${user.email}`, body);
        if (req.ok && !isEdit && uploaded.length > 0) {
          let addImg = await callPostFiles(
            apiRoutes.uploadFile + `/${user.email}` + `/${req.body}`,
            uploaded
          );
          if (addImg.ok) {
            navigate('/offers')
          }
        }
        else if (req.ok) {
          navigate('/offers')
        }
      }
      setAjax(false);
    },
    handleDropdown = (item: { id: string; text: string }) => {
      let tmp = { ...formData };
      tmp.category = item.text;
      setFormData(tmp);
      setCurrentItem(item as any);
    },
    removeFile = (id: number) => {
      let tmp = uploaded.filter((i, idx) => idx !== id);
      setFiles(tmp);
    };

  useEffect(() => {

    const fetchCategories = async () => {
      const res = await callGet(apiRoutes.getCategories);
      setCategories(
        (res.body as unknown as any[]).map((item) => {
          return { id: String(item.id), text: item.name };
        }) as ICategoryData[]
      );
    };
    fetchCategories().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isEdit && !!offer && categories.length > 0) {
      let curr = categories.filter((c) => c.text === offer.category);
      if (curr.length > 0) setCurrentItem(curr[0] as any);
      setValue("active", offer.active);
      setValue("title", offer.title);
      setValue("description", offer.description);
      let tmp = { ...formData };
      tmp.category = curr[0].text;
      setFormData(tmp);
    }
  }, [categories]);

  return (
    <PageContainer
      className="offer-create"
      title={
        <div className="offer-create-header">
          <h1>{isEdit ? "Edit offer" : "Add offer"}</h1>{" "}
          {isEdit && (
            <div className="close" onClick={() => setEdit(false)}>
              X
            </div>
          )}
        </div>
      }
    >
      <form onSubmit={handleSubmit((data) => handleForm(data))}>
        <FormItem>
          <TextInput
            id={"title"}
            labelText={"Title"}
            placeholder="title"
            {...register("title")}
          />
        </FormItem>
        <FormItem>
          <TextArea
            id={"description"}
            labelText={"Description"}
            maxCount={1000}
            placeholder="description"
            {...register("description")}
          />
        </FormItem>
        <FormItem>
          {categories.length > 0 && (
            <Dropdown
              items={categories}
              selectedItem={currentItem}
              id="categoryDropdown"
              label={"Pick category"}
              placeholder="pick category"
              itemToString={(item) => (item ? item.text : "")}
              onChange={({ selectedItem }) =>
                handleDropdown(selectedItem as any)
              }
            />
          )}
        </FormItem>
        <FormItem>
          <Checkbox
            id={"active"}
            labelText={"Activate offer?"}
            {...register("active")}
          />
        </FormItem>
        {!isEdit && (
          <FormItem>
            <FileUploaderDropContainer
              accept={["image/jpeg", "image/png"]}
              labelText={`Drag and drop files here or click to upload files for offer`}
              multiple
              onAddFiles={(e, x) => handleFileAdd(e, x)}
              onChange={(e) => {
              }}
              tabIndex={0}
            />
          </FormItem>
        )}
        <FormItem className="btn-container">
          <Button type="submit">
            {isEdit ? "Edit offer" : "Add offer"}
          </Button>
        </FormItem>
      </form>
      {!isEdit && (
        <div className="img-to-upload">
          <div className="divide-line-h"></div>
          <h4>Offer images</h4>
          <div className="uploaded-files">
          {uploaded.map((f, idx) => (
            <div className="mini-img" key={"f" + idx}>
              <div className=" img-container">
                {/* <img src={`data:${f};base64, ${f.fileData}`} alt={f.name} /> */}
                <img src={`${URL.createObjectURL(f)}`} alt={f.name} />
              </div>
              <div className="file-opt">
                <p>{f.name}</p>
                <div className="delete-file" onClick={() => removeFile(idx)}>
                  x
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </PageContainer>
  );
};
