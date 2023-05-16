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
import { Button, TextInput } from "carbon-components-react";

export const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const [isAjax, setAjax] = useState(false);
  const { register, handleSubmit } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data: any) => {
    setAjax(true);
    let res = await callPost(apiRoutes.login, data, false);

    if (res.status !== 401) {
      let user = await callGet(apiRoutes.user + "/" + data.email);

      let resUser = Object.assign({}, user.body, res.body);
      console.log(resUser);
      dispatch(login(resUser));
    }
    setAjax(false);
    navigate("/");
  };

  return (
    <PageContainer title="Login">
      <AjaxLoader isAjax={isAjax}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id={"email"}
            labelText={"Email"}
            placeholder="Email"
            {...register("email")}
          />
          <TextInput
            id={"password"}
            labelText={"Hasło"}
            placeholder="Hasło"
            type="password"
            {...register("password")}
          />
          <Button className="custom-button" type="submit" value="Login">
            Login
          </Button>
        </Form>
      </AjaxLoader>
    </PageContainer>
  );
};
