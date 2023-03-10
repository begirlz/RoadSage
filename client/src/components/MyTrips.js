import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { GET_TRIPS } from "../utils/queries";
import { REMOVE_TRIP } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import jwtDecode from 'jwt-decode';

function MyTrips() {
  const [deleteTrip] = useMutation(REMOVE_TRIP);
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "This is the first trip",
      description: "This is the first trip description",

      origin: "New York",
      destination: "Los Angeles",
    },
  ]);
  const [trip, settrip] = useState({});
  // const [title, setTitle] = useState();
  // const [description, setDescription] = useState();
  // const [origin, setOrigin] = useState();
  // const [destination, setDestination] = useState();
  function updateTrip(trip) {
    settrip(trip);
  }
  // }
  // function deleteTrip(index) {
  //   const newTrips = [...trips];
  //   newTrips.splice(index, 1);
  //   setTrips(newTrips);
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   updateTrip();
  // }

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

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const tempData = data.getTrips[0].savedTrips;
  console.log(typeof tempData);
  console.log(tempData);
  console.log(data.getTrips[0].savedTrips);

 const handleDeleteTrip = async (tripId) => {
    console.log(tripId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert('Please login');
      return false;
    }
    try {
      await deleteTrip({
        // variables: { trip: {...SavedTripInput} }
        variables: {
          tripId
        }
      });

      alert('Trip deleted successfully');

    } catch (err) {
      console.error(err);
    }
  };
  // const handleUpdateTrip = async (trip) => {
  //   let title = trip.title;
  //   let description = trip.description;
  //   let origin = trip.origin;
  //   let destination = trip.destination;
  //   console.log(title);
  // };

  return (
    <div id="big-box" className="main-container">
      <div className="inner-container text-light mb-5 pb-5">
        <div className="text-light p-4 mb-4">
          <h2 className="mb-0">
            <strong>My Trips</strong>
          </h2>
          
          <ul className="list-unstyled">
          {tempData.map((trip, index) => (
            <li key={trip._id} className="py-3">
              <h4>{trip.title}</h4>
              <p>{trip.description}</p>
              <p>
                {trip.origin} to {trip.destination}
              </p>
              <button className="btn btn-light  w-100" onClick={() => handleDeleteTrip(trip.tripId)}>Delete Trip</button>
              {/* <button className="btn btn-light  w-100">Delete Trip</button> */}
              <button className="btn btn-light  w-100" onClick={() => updateTrip(trip)}>Update Trip</button>
            </li>
          ))}
          </ul>
        </div>

        <form id="frm_search" className="mb-2">
          <div className="form-group row d-flex align-items-center">
            <label htmlFor="title" className="col-lg-2 col-form-label">
              <b>Title: </b>
            </label>
            <div className="col-lg-4 ">
              <input
                className="form-control"
                type="text"
                id="title"
                value={trip.title}
                // onChange={}
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
                value={trip.description}
                // onChange={}
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
                value={trip.origin}
                // onChange={}
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
                value={trip.destination}
                // onChange={}
              />
            </div>
          </div>
          <div className="form-group row d-flex align-items-center">

            
          
            
          </div>
          <div className="form-group row d-flex justify-content-end">
            <div className="col-lg-3">
              <button
                className="btn btn-light  w-100"
                type="submit"
                // onClick={handleSubmit}
              >
                Save Trip
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
          
}
export default React.memo(MyTrips);