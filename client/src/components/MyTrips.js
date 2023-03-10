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
      console.log(trip)

      await updateTrip({
        // variables: { trip: {...SavedTripInput} }
        variables: {
          trip: {
            tripId: trip.tripId,
            origin: originInput.current.value,
            destination: destinationInput.current.value,
            title: titleInput.current.value,
            description: descriptionInput.current.value,
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
    <div id="big-box" className="main-container">
      <div className="inner-container text-light mb-5 pb-5">
        <div className="text-light p-4 mb-4">
          <h2 className="mb-0">
            <strong>My Trips</strong>
          </h2>

          {/* <div className="">
            {tempData.map((trip, index) => (
              < div key={trip.tripId} className="py-3">
                <h4>{trip.title}</h4>
                <p>{trip.description}</p>
                <p>
                  {trip.origin} to {trip.destination}
                </p>
                <button className="btn btn-light  w-100" onClick={() => handleDeleteTrip(trip.tripId)}>Delete Trip</button>
                 Comment this one <button className="btn btn-light  w-100">Delete Trip</button> 
                <button className="btn btn-light  w-100" onClick={() => updateTripClick(trip)}>Update Trip</button>
              </div>
            ))}
          </div> */}

          {tempData.map((trip, index) => (
            <div key={trip.tripId} className="card mx-2 col-lg-3 " >
              <h3 className="card-header">
                <strong>({trip.title})</strong>
              </h3>
              <div className="card-body d-flex flex-column" style={{ width: '100%' }}>
                <div className='row'>
                  <p>({trip.description})</p>
                </div>
                <div className="card-footer d-flex justify-content-center mt-sm-auto">
                  <button className="btn btn-light  w-100" onClick={() => handleDeleteTrip(trip.tripId)}>Delete Trip</button>
                  <button className="btn btn-light  w-100" onClick={() => updateTripClick(trip)}>Update Trip</button>
                </div>
              </div>
            </div>
          ))}
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
          <div className="form-group row d-flex align-items-center">
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
          <div className="form-group row d-flex align-items-center">
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