import { useEffect, useState } from "react"
import { PageContainer } from "../common/layouts/PageContainer"
import { useSelector } from "react-redux"
import { selectUser } from "../common/Redux/Slices/userSlice"
import { callGet, callPatch } from "../common/Fetch"
import { apiRoutes } from "../common/ApiRoutes"
import { Button } from "carbon-components-react"
import { NavLink } from "react-router-dom"
import { IOffer } from "./Offer/models"

export const TestPage2 = () => {
    const user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        [favs, setFavs] = useState<IOffer[]>([])

    const getFavs = async () => {
        let req = await callGet(apiRoutes.getFavs + `/${user.email}`)
        setFavs(req.body as any)
    }
    const dislikeOffer = async (offer: any) => {
        let req = await callPatch(apiRoutes.dislikeOffer + `/${user.email}/${offer.id}`, null)
    }
    useEffect(() => {
        getFavs();
    }, [])

    return <PageContainer>
        {favs.map(f => <div >
            <NavLink to={`/offer/${f.user.id}/${f.id}`}>
                <p >{f.title}</p>
            </NavLink>
            <p>{f.description}</p>
            <p>{f.likes}</p>
            <Button onClick={() => dislikeOffer(f)}>dislike offer</Button>
        </div>)}
    </PageContainer>
}