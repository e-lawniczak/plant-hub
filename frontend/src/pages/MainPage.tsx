import { Button, DatePicker, DatePickerInput } from 'carbon-components-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { AjaxLoader } from '../common/AjaxLoader';
import { apiRoutes } from '../common/ApiRoutes';
import { Offer } from '../common/components/Offer';
import { callGet, callPost } from '../common/Fetch';
import { PageContainer } from '../common/layouts/PageContainer';
import { logout, selectUser } from '../common/Redux/Slices/userSlice';

export const MainPage = (props: any) => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>([]),
        [isAjax, setAjax] = useState(false),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        [searchTitle, setSearchTitle] = useState(""),
        [searchUser, setSearchUser] = useState(""),
        [searchCategory, setSearchCategory] = useState("");

    const getOffers = async () => {
        setAjax(true)
        let req = await callGet(apiRoutes.getOffers)
        setOffers(req.body as any)
        setAjax(false)
    }

    const handleUpdateSearchTitle = (event: any) => {
        setSearchTitle(event.target.value)
    }

    const handleUpdateSearchUser = (event: any) => {
        setSearchUser(event.target.value)
    }

    const handleUpdateSearchCategory = (event: any) => {
        setSearchCategory(event.target.value)
    }

    useEffect(() => {
        getOffers()
    }, [])

    return <PageContainer>
        <div className="main-menu">
            <div>
                <span>title:</span>
                <input type="text" value={searchTitle} onChange={handleUpdateSearchTitle}></input>
            </div>
            <div>
                <span>creator:</span>
                <input type="text" value={searchUser} onChange={handleUpdateSearchUser}></input>
            </div>
            <div>
                <span>category:</span>
                <select value={searchCategory} onChange={handleUpdateSearchCategory}>
                    <option value="All">All</option>
                    <option value="Pot plant">Pot plant</option>
                    <option value="Garden plant">Garden plant</option>
                    <option value="Small plant">Small plant</option>
                    <option value="Big plant">Big plant</option>
                    <option value="Medium plant">Medium plant</option>
                    <option value="Field plant">Field plant</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
        {offers.map(
            (offer) => (
                offer.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
                (offer.user.firstName.toLowerCase() + " " + offer.user.lastName.toLowerCase()).includes(searchUser.toLowerCase()) &&
                (offer.category === searchCategory || searchCategory === "All") &&
                <Offer offer={offer}/>
            )
        )}
    </PageContainer>
}
