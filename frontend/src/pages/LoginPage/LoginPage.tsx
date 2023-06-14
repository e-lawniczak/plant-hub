import { Form, useNavigate } from "react-router-dom";
import { AjaxLoader } from "../../common/AjaxLoader";
import { PageContainer } from "../../common/layouts/PageContainer";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiRoutes } from "../../common/ApiRoutes";
import { callGet, callPost } from "../../common/Fetch";
import { ILoginInputs } from "../../common/models";
import { login, logout } from "../../common/Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { Button, FormGroup, TextInput } from "carbon-components-react";

export const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const [isAjax, setAjax] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data: any) => {
    setAjax(true);
    let res = await callPost(apiRoutes.login, data, false);

    if (res.status !== 401) {
      let user = await callGet(apiRoutes.user + "/" + data.email);

      let resUser = Object.assign({}, user.body, res.body);
      dispatch(login(resUser));
    }
    setAjax(false);
    navigate("/");
  };

  return (
    <PageContainer title="Login">
      <AjaxLoader isAjax={isAjax}>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup legendText={""}>
            <TextInput
              id={"email"}
              labelText={"Email"}
              placeholder="Email"
              {...register("email", {required: "Email is required"})}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </FormGroup>
          <FormGroup legendText={""}>
            <TextInput
              id={"password"}
              labelText={"Password"}
              placeholder="Password"
              type="password"
              {...register("password", {required: "Password is required"})}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </FormGroup>
          <Button className="custom-button" type="submit" value="Login">
            Login
          </Button>
        </Form>
      </AjaxLoader>
    </PageContainer>
  );
};
