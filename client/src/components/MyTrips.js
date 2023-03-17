import React, { useState, useEffect, useRef } from "react";
import Auth from '../utils/auth';
import { GET_TRIPS } from "../utils/queries";
import { REMOVE_TRIP } from "../utils/mutations";
import { UPDATE_TRIP } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import jwtDecode from 'jwt-decode';

function MyTrips() {
  const [deleteTrip] = useMutation(REMOVE_TRIP);
  const [updateTrip] = useMutation(UPDATE_TRIP);

  const originInput = useRef("")
  const destinationInput = useRef("")
  const titleInput = useRef("")
  const descriptionInput = useRef("")

  // const [trips, setTrips] = useState([
  //   {
  //     id: 1,
  //     title: "This is the first trip",
  //     description: "This is the first trip description",

  //     origin: "New York",
  //     destination: "Los Angeles",
  //   },
  // ]);
  const [trip, settrip] = useState({});
  // const [title, setTitle] = useState();
  // const [description, setDescription] = useState();
  // const [origin, setOrigin] = useState();
  // const [destination, setDestination] = useState();
  function updateTripClick(trip) {
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
  const decodedToken = jwtDecode(token);
  let userId = decodedToken.data._id;

  const { loading, error, data } = useQuery(GET_TRIPS,
    { variables: { _id: userId } }
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const tempData = data.getTrips[0].savedTrips;
  // console.log(data.getTrips[0].tripCount)
  const tripCount = data.getTrips[0].tripCount;

  const handleDeleteTrip = async (tripId) => {

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
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateTrip = async (trip) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert('Please login');
      return false;
    }
    try {
      console.log('handleUpdateTrip')
      console.log(trip.tripId, titleInput.current.value,descriptionInput.current.value,
        originInput.current.value,destinationInput.current.value,);

      await updateTrip({
        // variables: { trip: {...SavedTripInput} }
        variables: { 
          trip: {        
            tripId: trip.tripId,
            title: titleInput.current.value,
            description: descriptionInput.current.value,
            origin: originInput.current.value,
            destination: destinationInput.current.value,          
          }
        }
      });

      alert('Trip updated successfully');
      // window.location.reload();

    } catch (err) {
      alert(err)
      console.error(err);
    }
  };

  return (
    <div className="container-fluid col-lg-10">
      <div className="mb-5 pb-5">
        <div className="p-4 mb-4 ">
          <h4 className="mb-2">
            <strong>My Trips:</strong>
            <span> total {tripCount} trips</span>
          </h4>

          <div className="d-flex flex-wrap justify-content-center ">
            {tempData.map((trip, index) => (

              <div key={trip.tripId} className="card mx-2 mb-2 col-lg-4 " >
                <div className="card-header">
                  <strong>{trip.title}</strong>
                </div>
                <div className="card-body w-100" >
                  <div className='row'>
                    <p>{trip.description}</p>
                  </div>
                  <div>
                    <p>From: {trip.origin} to {trip.destination}</p>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-evenly">
                  <div className="col-lg-3">
                    <button className="btn btn-danger w-100" onClick={() => handleDeleteTrip(trip.tripId)}>Delete Trip</button>
                  </div>
                  <div className="col-lg-3">
                    <button className="btn btn-dark w-100" onClick={() => updateTripClick(trip)}>Update Trip</button>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>

        <form id="frm_search" className="mb-2">
          <div className="form-group row d-flex align-items-center mb-2">
            <label htmlFor="title" className="col-lg-2 col-form-label">
              <b>Title: </b>
            </label>
            <div className="col-lg-4 ">
              <input
                className="form-control"
                type="text"
                id="title"
                ref={titleInput}
                defaultValue={trip.title}
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
                ref={descriptionInput}
                defaultValue={trip.description}
              // onChange={}
              />
            </div>
          </div>
          <div className="form-group row d-flex align-items-center mb-2">
            <label htmlFor="origin" className="col-lg-2 col-form-label">
              <b>Origin:</b>
            </label>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="text"
                id="origin"
                ref={originInput}
                defaultValue={trip.origin}
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
                defaultValue={trip.destination}
                ref={destinationInput}
              // onChange={}
              />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-end">
            <div className="col-lg-3">
              <button
                className="btn btn-light  w-100"
                type="submit"
                onClick={() => handleUpdateTrip(trip)}
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
export default MyTrips;