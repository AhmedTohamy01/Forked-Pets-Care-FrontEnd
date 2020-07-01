import React from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import "../styles/Services.css";
import Service from "../components/Service";

const Services = () => {

  const getServices = () => {
    axios
      .get("http://localhost:3001/services", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });}
  // const art = getArticles();
  return (
    <div>
      <NavBar option={"services"}/>
      <div className="float-right ServicesContainer"> 
        <h1 className="ServiceTile text-center">Our Services</h1>
        <h3 className="ServiceSubTile text-center">Check the differents services tha we offer.
        </h3>
        <div class="ServicesDisplay mt-3 d-flex justify-content-center">
          <Service/>
          <Service/>
          <Service/>
        </div>
        <div className="paginationButCont">
          <button className="buttonPagination btr float-right">R</button>
          <button className="buttonPagination btl float-left">L</button>
        </div>

        {/* <button onClick={getServices}className="btn btn-success">get services</button> */}
    </div>
    </div>
    
  )
};

export default Services;
