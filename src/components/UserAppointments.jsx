import React from "react";
import axiosCalls from "../services/axiosCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/UserAppointments.css";
const UserAppointments = () => {
  const [appoList, useAppoList] = React.useState([]);
  const [appointmentPast, useAppointmentPast] = React.useState(false);

  const SetAppointmenstPast = (value) => {
    useAppointmentPast(value);
  };

  const SetAppoList = (data) => {
    useAppoList(data);
  };

  const getAppointments = () => {
    axiosCalls.myAppointments()
      .then((response) => {
        SetAppoList(response.data.appointments);
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    getAppointments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pastAppointments = () => {
    return appoList.filter((item) => {
      let date = new Date(item.date.replace(/-/g, "/")); // eslint-disable-line no-useless-escape
      date.setHours(item.time.split("T")[1].split(":")[0]);
      return date < new Date();
    });
  };

  const futureAppointments = () => {
    return appoList.filter((item) => {
      let date = new Date(item.date.replace(/-/g, "/")); // eslint-disable-line no-useless-escape
      date.setHours(item.time.split("T")[1].split(":")[0]);
      return date > new Date();
    });
  };

  const handleForm = (e) => {
    SetAppointmenstPast(e.target.checked);
  };

  const deleteAppointment = (value) => {
    axiosCalls.deleteAppoinment(value)
      .then((response) => {
        getAppointments();
      })
      .catch((error) => {});
  };
  return (
    <div className="ServiceList mt-2 mr-2">
      <h4 className="mb-0">
        {" "}
        {!appointmentPast
          ? "Requested Appointments"
          : "Previous Appointments"}{" "}
      </h4>

      <div className="d-flex align-items-center">
        <span>Previous Appointments</span>
        <label className="switch mb-0 ml-2">
          <input type="checkbox" onClick={handleForm} />
          <span className="slider round"></span>
        </label>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"># ID</th>
            <th scope="col">Date</th>
            <th scope="col">Hour</th>
            <th scope="col">Pet Name</th>
            <th scope="col">Service</th>
            {!appointmentPast ? <th scope="col">Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {(!appointmentPast ? futureAppointments() : pastAppointments()).map(
            (appo) => (
              <tr key={appo.id}>
                <td>{appo.id}</td>
                <td>{appo.date}</td>
                <td>{appo.time.split("T")[1].split(".")[0]}</td>
                <td>{appo.pet_name}</td>
                <td>{appo.service_name}</td>
                {!appointmentPast ? (
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteAppointment(appo.id)}
                      className="fa-2x text-danger trashCan"
                    />
                  </td>
                ) : null}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointments;
