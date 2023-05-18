import { useState } from "react";
import { AjaxLoader } from "../../common/AjaxLoader";
import { PageContainer } from "../../common/layouts/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { apiRoutes } from "../../common/ApiRoutes";
import { callPut } from "../../common/Fetch";
import { Form, useNavigate } from "react-router-dom";
import { IModifyInputs } from "../../common/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormGroup, TextInput } from "carbon-components-react";

export const ModifyPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAjax, setAjax] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IModifyInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      city: user.city,
    },
  });

  const onSubmit: SubmitHandler<IModifyInputs> = async (data) => {
    setAjax(true);
    let res = await callPut(apiRoutes.user + "/" + user.email, data, true);

    setAjax(false);
    if (res.status === 200) {
      let userToken = {
        accessToken: user.accessToken,
        tokenType: user.tokenType,
      };
      let resUser = Object.assign({}, res.body, userToken);

      dispatch(login(resUser));

      navigate("/profile");
    }
    if (res.status === 401) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <PageContainer title="Update information">
      <AjaxLoader isAjax={isAjax}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup legendText={""}>
            <TextInput
              id={"firstName"}
              labelText={"First Name"}
              placeholder="First name"
              {...register("firstName", {required: "First name is required"})}
            />
            {errors.firstName && <span className="error">{errors.firstName.message}</span>}
          </FormGroup>
          <FormGroup legendText={""}>
            <TextInput
              id={"lastName"}
              labelText={"Last Name"}
              placeholder="Last name"
              {...register("lastName", {required: "Last name is required"})}
            />
            {errors.lastName && <span className="error">{errors.lastName.message}</span>}
          </FormGroup>
          <FormGroup legendText={""}>
            <TextInput
              id={"phone"}
              type="tel"
              labelText={"Phone"}
              placeholder="Phone"
              {...register("phone", {required: "Phone is required"})}
            />
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </FormGroup>
          <FormGroup legendText={""}>
            <TextInput
              id={"city"}
              labelText={"City"}
              placeholder="City"
              {...register("city", {required: "City is required"})}
            />
            {errors.city && <span className="error">{errors.city.message}</span>}
          </FormGroup>
          <Button className="custom-button" type="submit" value="Update">
            Update{" "}
          </Button>
        </Form>
      </AjaxLoader>
    </PageContainer>
  );
};
