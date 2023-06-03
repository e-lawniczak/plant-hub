import { Console } from 'console';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { apiRoutes } from '../../common/ApiRoutes';
import { Offer } from '../../common/components/Offer';
import { callGet } from '../../common/Fetch';
import { PageContainer } from '../../common/layouts/PageContainer';
import { selectUser } from '../../common/Redux/Slices/userSlice';
import { IOffer } from './models';


export const LikedOffers = () => {
    const user = useSelector(selectUser),
        [favs, setFavs] = useState<IOffer[]>([])

    const getFavs = async () => {
        let req = await callGet(apiRoutes.getFavs + `/${user.email}`)
        setFavs(req.body as any)
        console.log(req.body)
    }
    useEffect(() => {
        getFavs();
    }, []) 

    return <PageContainer title={"Liked offers"}>
        <div className="grid-3">
            {favs.map(f => <div >
                <Offer offer={f}/>

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