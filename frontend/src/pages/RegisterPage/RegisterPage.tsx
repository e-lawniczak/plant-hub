import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AjaxLoader } from "../../common/AjaxLoader";
import { apiRoutes } from "../../common/ApiRoutes";
import { callPost } from "../../common/Fetch";
import { PageContainer } from "../../common/layouts/PageContainer";
import { IRegisterInputs } from "../../common/models";
import { Button, FormGroup, TextInput } from "carbon-components-react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isAjax, setAjax] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm<IRegisterInputs>();

  const onSubmit: SubmitHandler<IRegisterInputs> = async (data) => {
    setAjax(true);
    await callPost(apiRoutes.register, data, false);
    setAjax(false);

    navigate("/");
  };

  return (
    <PageContainer>
      <h1>Register</h1>
      <AjaxLoader isAjax={isAjax}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup legendText={""}>
            <TextInput
              id={"email"}
              labelText={"Email"}
              placeholder="Email"
              {...register("email", {
                required: "Email is required", 
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, 
                  message:"This is not an email"}})}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </FormGroup>
          <FormGroup legendText={""}>
            <TextInput
              id={"password"}
              labelText={"Password"}
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/i,
                  message:"Password must be a strong"}})}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </FormGroup>
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
          <Button className="custom-button" type="submit" value="Register">
            Register
          </Button>
        </Form>
      </AjaxLoader>
    </PageContainer>
  );
};
