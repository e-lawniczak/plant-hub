import { Content, Tile, Button } from 'carbon-components-react';
import { callDelete, callGet, callPatch, callPost, callPostFiles, callPut } from '../../common/Fetch';
import { useSelector } from 'react-redux';
import { selectUser } from '../../common/Redux/Slices/userSlice';
import { apiRoutes } from '../../common/ApiRoutes';
import { useEffect, useState } from 'react';

export const Offer = (props: any) => {

    const user = useSelector(selectUser),
        [offers, setOffers] = useState<any[]>([]),
        [isAjax, setAjax] = useState(false),
        [images, setImages] = useState<any[]>([]),
        [userToRep, setRep] = useState<any>(null),
        [offerToLike, setFav] = useState<any>(null),
        [checkRep, setCheckRep] = useState(false),
        [uploaded, setFiles] = useState<any[]>([])

    const handleDeactivate = () => {
        alert("click")
    }
    
    const handleDelete = async () => {
        let req = await callDelete(apiRoutes.deleteOffer + `/${user.email}` + `/${props.offer.id}`, null)
    }

    return <Content>
    <Tile>
      <h2>{props.offer.title}</h2>
      <h4>{props.offer.category}</h4>
      <p>{props.offer.description}</p>
      <div>Date: {props.offer.date}</div>
      {props.offer.active &&
        <Button onClick={handleDeactivate}>End offer</Button>
      }
      <Button onClick={handleDelete}>Delete</Button>
    </Tile> 
  </Content>
}