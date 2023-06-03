import { Button } from 'carbon-components-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { apiRoutes } from '../../common/ApiRoutes';
import { callGet, callPatch } from '../../common/Fetch';
import { PageContainer } from '../../common/layouts/PageContainer';
import { selectUser } from '../../common/Redux/Slices/userSlice';
import { Offer } from './models';
import { MyOffer } from '../../common/components/MyOffer';


export const LikedOffers = () => {
    const user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        [favs, setFavs] = useState<Offer[]>([])

    const getFavs = async () => {
        let req = await callGet(apiRoutes.getFavs + `/${user.email}`)
        setFavs(req.body as any)
    }
    const dislikeOffer = async (offer: any) => {
        let req = await callPatch(apiRoutes.dislikeOffer + `/${user.email}/${offer.id}`, null)
        if (req.ok) {
            getFavs();
        }
    }
    useEffect(() => {
        getFavs();
    }, []) 

    return <PageContainer title={"Liked offers"}>
        <div className="grid-3">
            {favs.map(f => <div >
                <MyOffer offer={f} isLiked={true} dislikeOffer={dislikeOffer} />

            </div>)}
        </div>
        {favs.length <= 0 &&
            <div className=''>
                You have no liked offers so far. <br />
                Find some offers for you!<br />
                <NavLink style={{ color: "blue", textDecoration: "underline" }} to={'/'}>Go!</NavLink>
            </div>}
    </PageContainer>
}