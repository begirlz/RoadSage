import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Auth from '../utils/auth';
import { SAVE_TRIP } from "../utils/mutations";
import { useMutation } from "@apollo/client";

// state means all the information of the variable of the component, setState means to change those values - then to = useState is the function from react letting them know this is a hook which purpose is to create reactive functions. 

function MyComponent() {
  const APIKey = process.env.REACT_APP_API_KEY;

  const [state, setState] = useState({
    response: null,
    travelMode: 'DRIVING',
    origin: 'Las Vegas',
    destination: 'Arizona'
  });

  const originInput = useRef("")
  const destinationInput = useRef("")

  //   // purpose of a useRef is to connect an input with a variable

  //   // directionsCallback is importing useCallback to receive the info and run the function
  const directionsCallback = useCallback((res) => {
    if (res != null) {
      setState({
        response: res, origin: '',
        destination: ''
      })
    }
  })

  // we are using different variables to do the search in google maps and to store the users input information. the reason is we want to wait for the user to finish typing in the values in the search bar.

  // setState in the searchRoute is to change the values in the state for the user input
  function searchRoute() {
    if (originInput.current.value !== "" && destinationInput.current.value !== "") {
      setState({
        response: null,
        origin: originInput.current.value,
        destination: destinationInput.current.value
      })
    }
  }

  const [saveTrip] = useMutation(SAVE_TRIP);

  const handleSaveTrip = async (originInput, destinationInput) => {
    console.log(originInput);
    sessionStorage = {originInput, destinationInput};
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    if (originInput === "" && destinationInput === "") {
      console.error('You have not searched for any route');
    }
    try {
      console.log('savetrip');
      await saveTrip({
        variables: { origin: sessionStorage.originInput, destination: sessionStorage.destinationInput }
      });
    } catch (err) {
      console.error(err);
    } 
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: APIKey,
  })
  if (!isLoaded) {
    return <p>loading...</p>
  }

  return (
    <div id="big-box" className="main-container">
      <div class="" id="small-box">
        {/* <LoadScript googleMapsApiKey={process.env.APIgooglemaps}> */}
        {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}> */}
        {/* <input type="text" placeholder='origin' ref={originInput} />
        <input type="text" placeholder='destination' ref={destinationInput} />
        <button onClick={searchRoute}>Search </button> */}

        <form id="frm_search" className="mb-2">
          <div class="form-group row d-flex align-items-center">
            <label for="txt_origin" className='col-lg-2 col-form-label'>
              <b>Origin :</b>
            </label>
            <div class="col-lg-3 ">
              <input className="form-control" type="text" name='origin' id="txt_origin" placeholder='origin' ref={originInput} />
            </div>
            <label htmlFor="txt_destination" className='col-lg-2 col-form-label'>
              <b>Description:</b>
            </label>
            <div class="col-lg-3">
              <input className="form-control" type="text" name="destination" id="txt_destination" placeholder='destination' ref={destinationInput} />
            </div>
            <div className='col-lg-2'>
              <button
                className='btn btn-light'
                type='button'
                onClick={searchRoute}>
                Search
              </button>
              <button
                className='btn btn-light'
                type='button'
                onClick={() => handleSaveTrip(originInput.current.value, destinationInput.current.value)}>
                Save
              </button>
            </div>
          </div>
        </form>

        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: '400px',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
            // lat: 33.3080062,
            // lng: -111.8834117
          }}

        >
          {/* DirectionsService means its just searching and getting the data for the directions. 
           once the information gets back to the server it will run the callback function.
            the DirectionsService is like a fetch request in this instance of code. Once the directions have come back from the google maps, it will run.   */}
          {
            (
              state.destination !== '' &&
              state.origin !== ''
            ) && (
              <DirectionsService
                options={{
                  destination: state.destination,
                  origin: state.origin,
                  travelMode: 'DRIVING'
                }}
                // required
                callback={directionsCallback}

              />
            )
          }
          {/* DirectionsRenderer will use the information from the DirectionsService to actually create/drawer the information in the map for the user. if the response is no longer equal to null then the directionRenderer will run and create a route.   */}
          {
            state.response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: state.response
                }}

              />
            )
          }
        </GoogleMap>
        {/* </LoadScript> */}
      </div>
    </div>
  )
}

export default React.memo(MyComponent)