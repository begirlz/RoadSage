import React, { useState } from "react";

function MyTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "This is the first trip",
      description: "This is the first trip description",
      date: "2021-01-01",
      time: "12:00",
    },
  ]);

  const [id, setId] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function addTrip() {
    const newTrip = {
      id: id,
      title: title,
      description: description,
      date: date,
      time: time,
    };
    setTrips([...trips, newTrip]);
    setId(id + 1);
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTrip();
  }

  return (
    <div class="d-flex flex-column mb-3">
      <div class="p-2 justify-content-center">
        <h2 class="text-center">My Trips</h2>
        <p class="text-center">This is my trips page</p>
      </div>
      <div class="card-group">
      {trips.map((trip) => (
          // <li key={trip.id}>
          //   <h4>{trip.title}</h4>
          //   <p>{trip.description}</p>
          //   <p>
          //     {trip.date} at {trip.time}
          //   </p>
          // </li>
          <div class="card" key={trip.id}>
            <div class="card-body">
              <h5 class="card-title">{trip.title}</h5>
              <p class="card-text">{trip.description}</p>
              <a href="#" class="card-link">Card link</a>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label htmlFor="time">
          Time:
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <button type="button" class="btn btn-light">Add Trip</button>
      </form>
    </div>
  );
}

export default MyTrips;
