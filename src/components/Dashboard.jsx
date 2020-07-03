import React from "react";
import { useSelector } from "react-redux";
import FormServices from "./FormServices";
import NavBar from "./Navbar.jsx";
import "../styles/Dashboard.css";
import AdminButtons from "./AdminButtons.jsx";
import ServicesList from "./ServicesList.jsx";
import AppointmentsEmployes from "./AppointmentsEmployes.jsx";
import UserAppointments from "./UserAppointments.jsx";

const Dashboard = () => {

  const [selectedButton, useSelectedButton] = React.useState("");

  
  const ButtonSelected = (value) => {
    useSelectedButton(value)
  }

  const user = useSelector((state) => state.loggedInStatus);
  return (
    <div>
       <NavBar option={"dashboard"}/>

      <div className="float-right DashboardContainer">  
      <h1 className="DashboardTile text-center">Dashboard</h1>
      {user.loggedInStatus === "NOT_LOGGED_IN" ? (
          <h3  className="DashboardSubTile text-center">You are not Logged In </h3>
        ) : null}
        {user.loggedInStatus === "LOGGED_IN" ? (
          <h3 className="DashboardSubTile text-center">Welcome <span className="text-capitalize">{user.user.name}</span> </h3>
        ) : null}

      { user.user.role === "admin" || user.user.role === "employe" ? <AdminButtons ButtonSelected={ButtonSelected}/> : null}
      
      {selectedButton === "ads" ? <FormServices ButtonSelected={ButtonSelected}/> : null}
      {selectedButton === "ser" ? <ServicesList/> : null}
      {selectedButton === "aps" ? <AppointmentsEmployes/> : null}
      {selectedButton === "map" || user.user.role === "user"  ? <UserAppointments/>: null}
      {/* <EmployeButtons/>
      <ClientButtons/> */}
       {/* <h1>Dashboard</h1>
        <FormArticles userID={user.user.id} />
        <Articles /> */}
      </div> 
    </div>
  );
};

export default Dashboard;
