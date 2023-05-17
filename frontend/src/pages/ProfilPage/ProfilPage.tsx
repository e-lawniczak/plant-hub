import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { callDelete } from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader";
import { apiRoutes } from "../../common/ApiRoutes";
import { useState } from "react";
import { callPost } from "../../common/Fetch";
import { Button } from "carbon-components-react";

export const ProfilPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAjax, setAjax] = useState(false);

  const user = useSelector(selectUser);

  const modifyUser = () => {
    navigate("/profile/modify", { replace: false });
  };

  const deleteUser = async () => {
    setAjax(true);
    let res = await callDelete(apiRoutes.user + "/" + user.email, true);

    setAjax(false);

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login", { replace: true });
    } else {
      dispatch(logout());
      navigate("/", { replace: true });
    }
  };

  const logoutUser = async () => {
    if (user) {
      setAjax(true);
      await callPost(
        apiRoutes.user + "/" + user.email + "/logout",
        null,
        user.accessToken,
        false
      );
      setAjax(false);
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <PageContainer title="Mój profil">
      <section className="profile-page">
        <section className="profile-page-left">
          <h2>Email:</h2>
          <h2>Name:</h2>
          <h2>Phone:</h2>
          <h2>City:</h2>
          <h2>Votes:</h2>
        </section>
        <section className="profile-page-right">
          <h2>{user.email}</h2>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h2>{user.phone}</h2>
          <h2>{user.city}</h2>
          <h2>{user.votes}</h2>
        </section>
      </section>
      <AjaxLoader isAjax={isAjax}>
        <div className="profile-page-buttons">
          <Button className="custom-button" onClick={modifyUser}>
            Modify
          </Button>
          <Button className="custom-button" onClick={logoutUser}>
            Log out
          </Button>
          <Button className="custom-button" kind="danger" onClick={deleteUser}>
            Delete
          </Button>
        </div>
      </AjaxLoader>
    </PageContainer>
  );
};
