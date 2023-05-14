import { Content, Tile, Button } from 'carbon-components-react';
import { callDelete, callGet, callPatch, callPost, callPostFiles, callPut } from '../Fetch';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/userSlice';
import { apiRoutes } from '../ApiRoutes';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const MyOffer = (props: any) => {

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
      <NavLink to={`/offer/${props.offer.user.id}/${props.offer.id}`}><h2>{props.offer.title}</h2></NavLink>
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