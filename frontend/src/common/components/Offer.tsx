import { Content, Tile } from "carbon-components-react";
import { NavLink } from "react-router-dom";

export const Offer = (props: any) => {
  return (
    <Content>
      <Tile className="offer-tile">
        <NavLink to={`/offer/${props.offer.user.id}/${props.offer.id}`}>
          <h2>{props.offer.title}</h2>
          <h4>{props.offer.category}</h4>
          <p>{props.offer.user.firstName + " " + props.offer.user.lastName}</p>
          <p>{props.offer.description}</p>
          <div>Date: {props.offer.date}</div>
        </NavLink>
      </Tile>
    </Content>
  );
};
