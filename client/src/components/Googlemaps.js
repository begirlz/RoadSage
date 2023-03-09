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
    console.log('search:' + originInput.current.value + destinationInput.current.value);
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
    console.log(originInput + "," + destinationInput);

    // const SavedTripInput =  {origin: originInput, destination: destinationInput};

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert('Please login');
      return false;
    }
    if (originInput === "" && destinationInput === "") {
      console.error('You have not searched for any route');
    }
    try {
      console.log('savetrip: ' + originInput + ',' + destinationInput);
      await saveTrip({
        // variables: { trip: {...SavedTripInput} }
        variables: {
          trip: {
            tripId: '1',
            origin: originInput,
            destination: destinationInput
          }
        }
      });

      alert('Trip saved successfully');

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
      <div id="small-box">

        <form id="frm_search" className="mb-2">
          <div className="form-group row d-flex align-items-center justify-content-center">
            <div className='col-lg-2  form-label'>
              <label htmlFor="txt_origin" className='w-100 col-form-label '>
                <b>Origin :</b>
              </label>
            </div>
            <div className="col-lg-4 ">
              <input className="form-control w-100" type="text" name='origin' id="txt_origin" placeholder='origin' ref={originInput} />
            </div>
            <div className='col-lg-2 form-label'>
              <label htmlFor="txt_destination" className='w-100 col-form-label '>
                <b>Destination: </b>
              </label>
            </div>
            <div className="col-lg-4">
              <input className="form-control w-100" type="text" name="destination" id="txt_destination" placeholder='destination' ref={destinationInput} />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-end">
            <div className='col-lg-2'>
              <button
                className='btn btn-light w-100'
                type='button'
                onClick={searchRoute}>
                Search
              </button>
            </div>

            {/* Allow only logged in user to save trip */}
            {Auth.loggedIn() && (
              <div className='col-lg-2'>
                <button
                  className='btn btn-light w-100'
                  type='button'
                  onClick={() => handleSaveTrip(originInput.current.value, destinationInput.current.value)}>
                  Save
                </button>
              </div>
            )}

          </div>
        </form>

        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: '500px',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
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
      </div>
    </div>
  )
}

export default React.memo(MyComponent)