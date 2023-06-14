import { Content, Tile } from "carbon-components-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Offer = (props: any) => {

  return (
    <Content>
      <Tile className="offer-tile">
        <NavLink to={`/offer/${props.offer.user.id}/${props.offer.id}`} className="offer-nav">
          <div className="">
            <h2 className="title">{props.offer.title}</h2>
            <h4>{props.offer.category}</h4>
            <p>{props.offer.user.firstName + " " + props.offer.user.lastName}</p>
            <p className="desc">{props.offer.description}</p>
            <div>Date: {new Date(props.offer.date).toLocaleDateString()}</div>
          </div>
          <div className="offer-img-container">
            {props.offer.file.fileData !== null && (
              <img className="offer-img"
                src={`data:${props.offer.file};base64, ${props.offer.file.fileData}`}
                alt="No picture"
              />
            )}
            {props.offer.file.fileData === null && (
              <p className="offer-alt">No picture to display</p>
            )}
          </div>
        </NavLink>
      </Tile>
    </Content>
  );
};
