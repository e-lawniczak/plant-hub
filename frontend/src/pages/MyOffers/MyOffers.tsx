import { PageContainer } from "../../common/layouts/PageContainer"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUser } from '../../common/Redux/Slices/userSlice';
import { callDelete, callGet, callPatch, callPost, callPostFiles, callPut } from '../../common/Fetch';
import { apiRoutes } from '../../common/ApiRoutes';
import { Offer } from "../../common/components/Offer";

export const MyOffers = () => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>([]),
        [isAjax, setAjax] = useState(false),
        [images, setImages] = useState<any[]>([]),
        [userToRep, setRep] = useState<any>(null),
        [offerToLike, setFav] = useState<any>(null),
        [checkRep, setCheckRep] = useState(false),
        [uploaded, setFiles] = useState<any[]>([])

    const getUser = async (email: string) => {
        setAjax(true)
        let req = await callGet(apiRoutes.getOffers + '/' + email)
        setOffers(req.body as any)
        setAjax(false)
    }

    useEffect(() => {
      getUser(user.email)
    }, [])
    

    return <PageContainer>
        {offers?.map(
            (offer) => (
                <Offer offer={offer}></Offer>
            )
        )}
    </PageContainer>
}