import { PageContainer } from "../../common/layouts/PageContainer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { callGet } from "../../common/Fetch";
import { apiRoutes } from "../../common/ApiRoutes";
import { MyOffer } from "../../common/components/MyOffer";

export const MyOffers = () => {
  const user = useSelector(selectUser),
    [offers, setOffers] = useState<any[]>([]),
    [isAjax, setAjax] = useState(false);

  const getUser = async (email: string) => {
    setAjax(true);
    let req = await callGet(apiRoutes.getOffers + "/" + email);
    setOffers(req.body as any);
    setAjax(false);
  };

  useEffect(() => {
    getUser(user.email);
  }, []);

  return (
    <PageContainer>
      <div className="grid-3">
        {offers?.map((offer) => (
          <MyOffer offer={offer}></MyOffer>
        ))}
      </div>
    </PageContainer>
  );
};
