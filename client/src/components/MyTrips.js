import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { GET_TRIPS, GET_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import jwtDecode from 'jwt-decode';

function MyTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "This is the first trip",
      description: "This is the first trip description",
      date: "2021-01-01",
      time: "12:00",
      origin: "New York",
      destination: "Los Angeles",
    },
  ]);
  const [id, setId] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  function updateTrip() {
    const newTrip = {
      id: id,
      title: title,
      description: description,
      origin: origin,
      destination: destination,
      date: date,
      time: time,
    };
    setTrips([...trips, newTrip]);
    setId(id + 1);
    setTitle("");
    setDescription("");
    setOrigin("");
    setDestination("");
    setDate("");
    setTime("");
  }
  function deleteTrip(index) {
    const newTrips = [...trips];
    newTrips.splice(index, 1);
    setTrips(newTrips);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateTrip();
  }

  const token = localStorage.getItem('id_token');

  console.log(token);
    const decodedToken = jwtDecode(token);
    let userId = decodedToken.data._id;
  console.log(userId);
  console.log(typeof userId);

  // const { loading, meData } = useQuery(GET_ME);

  //   const { loading: userLoading, error: userError, data: userData} = useQuery(GET_ME);
  //   let userData = meData?.me || me;
  const { loading, error, data } = useQuery(GET_TRIPS,
    { variables: { _id: userId } }
  );

  console.log(data);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // const userTrips = data?.trips || {};
  // const HandleSaveTrip = async (data) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     alert('Please login');
  //     return false;
  //   }
  //   try {
  //     await getTrips({
  //       // variables: { trip: {...SavedTripInput} }
  //       variables: {}
  //     });

  //     alert('Trip loaded succesfully');

  //   } catch (err) {
  //     console.error(err);
  // }}

  return (
    <div id="big-box" className="main-container">
      <div className="inner-container text-light">
        <div>
          <h2>
            <strong>My Trips</strong>
          </h2>
          <p>This is my trips page</p>
          {data.map((trip) => (
            <li key={trip.tripId}>
              <h4>{trip.title}</h4>
              <p>{trip.description}</p>
              <p>
                {trip.origin} to {trip.destination} on {trip.date} at {trip.time}
              </p>
            </li>
          ))}
        </div>

        <form id="frm_search" className="mb-2" onSubmit={handleSubmit}>
          <div className="form-group row d-flex align-items-center">
            <label htmlFor="title" className="col-lg-2 col-form-label">
              <b>Title: </b>
            </label>
            <div className="col-lg-4 ">
              <input
                className="form-control"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label htmlFor="description" className="col-lg-2 col-form-label">
              <b>Description:</b>
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row d-flex align-items-center">
            <label htmlFor="origin" className="col-lg-2 col-form-label">
              <b>Origin:</b>
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <label htmlFor="destination" className="col-lg-2 col-form-label">
              <b>Destination:</b>
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row d-flex align-items-center">
            <label htmlFor="date" className="col-lg-2 col-form-label">
              <b> Date: </b>
            </label>
            <div className="col-lg-4 ">
              <input
                className="form-control"
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <label htmlFor="time" className="col-lg-2 col-form-label">
              <b>Time: </b>
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-end">
            <div className="col-lg-3">
              <button
                className="btn btn-light  w-100"
                type="submit"
                onClick={handleSubmit}
              >
                Update Trip
              </button>
              <button
                className="btn btn-light  w-100"
                type="button"
                onClick={() => deleteTrip(trips.length - 1)}
              >
                Delete Trip
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default React.memo(MyTrips);