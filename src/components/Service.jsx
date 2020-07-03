import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import PropTypes from 'prop-types';

const Service = ({service}) => {
  return (
    <div className="mx-4" style={{width: "18rem"}}>
      <img className="card-img-top rounded" style={{height: "18rem"}} src={service.image_url} alt="Logo_Pets_Care"/>
      <div className="card-body">
        <h5 className="card-text text-center text-capitalize font-weight-bold">{service.name}</h5>
        <hr className="w-50" style={{borderBottom: "3px #b8c8cf dotted"}}/>
        <h6 className="text-center text-capitalize font-weight-bold" style={{color: "#8c9091"}}>{service.description}</h6>

        <div className="d-flex justify-content-center">
        <FontAwesomeIcon icon={faFacebook} style={{color: "#8c9091"}} className={"fa-2x mx-2 p-1 border border-secondary rounded-circle"}/>
        <FontAwesomeIcon icon={faTwitter} style={{color: "#8c9091"}} className={"fa-2x mx-2 p-1 border border-secondary rounded-circle"}/>
        <FontAwesomeIcon icon={faInstagram} style={{color: "#8c9091"}} className={"fa-2x mx-2 p-1 border border-secondary rounded-circle"}/>
      </div>
      </div>
      
    </div>
    );
}

Service.propTypes = {
  service: PropTypes.object.isRequired,
};
 
export default Service;