import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

// state means all the information of the variable of the component, setState means to change those values - then to = useState is the function from react letting them know this is a hook which purpose is to create reactive functions. 

function MyComponent() {
const [state, setState]= useState ({
response: null,
travelMode: 'DRIVING',
     origin: 'Las Vegas',
    destination: 'Arizona'
  });

const originInput = useRef("")
const destinationInput = useRef("")

//   // purpose of a useRef is to connect an input with a variable

//   // directionsCallback is importing useCallback to receive the info and run the function
 const directionsCallback= useCallback ((res)=>{
    if ( res != null ) {
      setState({response:res,origin: '',
      destination: ''})
    }
  })

  // we are using different variables to do the search in google maps and to store the users input information. the reason is we want to wait for the user to finish typing in the values in the search bar.

  // setState in the searchRoute is to change the values in the state for the user input
function searchRoute (){
  if (originInput.current.value!="" && destinationInput.current.value!="")
  {
    setState({
      response:null,
      origin: originInput.current.value,
      destination: destinationInput.current.value
    })
  }
}
  return (
    <div>
         <LoadScript googleMapsApiKey={process.env.APIgooglemaps}>
<div class="d-flex flex-column mb-3 searchBtn" >
  <input type = "text" placeholder='origin' ref={originInput}/> 
<input type = "text" placeholder='destination' ref={destinationInput}/> 
<button onClick={searchRoute} type="button" class="btn btn-light" >Search </button>
</div>


   
      
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
            }}
            
          >  // DirectionsService means its just searching and getting the data for the directions.
          //  once the information gets back to the server it will run the callback function.
            /* the DirectionsService is like a fetch request in this instance of code. Once the directions have come back from the google maps, it will run. */
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
    </LoadScript>
    </div>
  )
}

export default React.memo(MyComponent)