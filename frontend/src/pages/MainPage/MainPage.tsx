import { Dropdown, TextInput } from "carbon-components-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { apiRoutes } from "../../common/ApiRoutes";
import { Offer } from "../../common/components/Offer";
import { callGet } from "../../common/Fetch";
import { PageContainer } from "../../common/layouts/PageContainer";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { CategoryData, OfferData } from "../../pages/Offer/models";

export const MainPage = () => {
  const user = useSelector(selectUser),
    [offers, setOffers] = useState<any[]>([]),
    [isAjax, setAjax] = useState(false),
    [searchTitle, setSearchTitle] = useState(""),
    [searchUser, setSearchUser] = useState(""),
    [formData, setFormData] = useState<OfferData>({
      category: "",
      date: new Date(),
      description: "",
      title: "",
    }),
    [searchCategory, setSearchCategory] = useState<CategoryData>(),
    [categories, setCategories] = useState<CategoryData[]>([]),
    [searchCity, setSearchCity] = useState("");

  const handleUpdateSearchTitle = (event: any) => {
    setSearchTitle(event.target.value);
  };

  const handleUpdateSearchUser = (event: any) => {
    setSearchUser(event.target.value);
  };

  const dropdownStyle = {
    width: "300px",
  };

  const handleDropdown = (item: { id: string; text: string }) => {
    let tmp = { ...formData };
    tmp.category = item.text;
    setFormData(tmp);
    setSearchCategory(item as any);
  };

  const handleUpdateSearchCity = (event: any) => {
    setSearchCity(event.target.value);
  };

  const getCategories = async () => {
    const res = await callGet(apiRoutes.getCategories);
    console.log(res.body as any);
    const allCategory = { id: "all", text: "All" };
    setSearchCategory(allCategory);
    setCategories([
      allCategory,
      ...(res.body as unknown as any[]).map((item) => {
        return { id: String(item.id), text: item.name };
      }),
    ] as CategoryData[]);
  };

  const getOffers = async () => {
    setAjax(true);
    let req = await callGet(apiRoutes.getOffers);
    setOffers(req.body as any);
    setSearchCity(user.city);
    setAjax(false);
  };

  useEffect(() => {
    getOffers().catch((error) => console.log(error));
    getCategories().catch((error) => console.log(error));
  }, []);

  return (
    <PageContainer>
      <div className="main-menu">
        <div>
          <TextInput
            id={"title"}
            labelText={"Title"}
            placeholder="Title"
            type="text"
            value={searchTitle}
            onChange={handleUpdateSearchTitle}
          ></TextInput>
        </div>
        <div>
          <TextInput
            id={"user"}
            labelText={"User"}
            placeholder="User"
            type="text"
            value={searchUser}
            onChange={handleUpdateSearchUser}
          ></TextInput>
        </div>
        <div>
          <TextInput
            id={"city"}
            labelText={"City"}
            placeholder="City"
            type="text"
            value={searchCity}
            onChange={handleUpdateSearchCity}
          ></TextInput>
        </div>
        <div>
          {categories.length > 0 && (
            <Dropdown
              style={dropdownStyle}
              items={categories}
              selectedItem={searchCategory}
              id="categoryDropdown"
              label={"Pick category"}
              placeholder="pick category"
              initialSelectedItem={categories[0]}
              itemToString={(item) => (item ? item.text : "")}
              onChange={({ selectedItem }) =>
                handleDropdown(selectedItem as any)
              }
            />
          )}
        </div>
      </div>
      <div className="grid-3">
        {offers.map(
          (offer) =>
            offer.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
            (
              offer.user.firstName.toLowerCase() +
              " " +
              offer.user.lastName.toLowerCase()
            ).includes(searchUser.toLowerCase()) &&
            (offer.category === searchCategory?.text ||
              searchCategory?.text === "All") &&
            offer.user.city
              .toLowerCase()
              .includes(searchCity.toLowerCase()) && <Offer offer={offer} />
        )}
      </div>
    </PageContainer>
  );
};
