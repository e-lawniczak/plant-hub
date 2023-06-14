import { PageContainer } from "../../common/layouts/PageContainer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { callGet } from "../../common/Fetch";
import { apiRoutes } from "../../common/ApiRoutes";
import { Offer } from "../../common/components/Offer";

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
    <PageContainer title="My Offers">
      <div className="grid-3">
        {offers && offers.length > 0 && offers?.map((offer, idx) => (
          <Offer key={idx} offer={offer}></Offer>
        ))}
      </div>
    </PageContainer>
  );
};
