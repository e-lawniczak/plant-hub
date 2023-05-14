import { Content, Tile, Button } from 'carbon-components-react';
import { callDelete, callGet, callPatch, callPost, callPostFiles, callPut } from '../Fetch';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/userSlice';
import { apiRoutes } from '../ApiRoutes';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Offer = (props: any) => {

        
    const categories = [
      { id: '1', text: "Pot plant" },
      { id: '2', text: "Garden plant" },
      { id: '3', text: "Small plant" },
      { id: '4', text: "Big plant" },
      { id: '5', text: "Medium plant" },
      { id: '6', text: "Field plant" },
      { id: '7', text: "Decoration" },
      { id: '8', text: "Other" },
    ]

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
      <div>Creator: {props.offer.user.firstName + " " + props.offer.user.lastName}</div>
      <div>Date: {props.offer.date}</div>
    </Tile> 
  </Content>
}