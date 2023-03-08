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

    <div id="big-box" className="main-container col-lg-10 col-sm-10">
      <div className="inner-container text-light">
        <h2><strong>My Trips</strong></h2>
        <p>This is my trips page</p>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h4>{trip.title}</h4>
            <p>{trip.description}</p>
            <p>
              {trip.date} at {trip.time}
            </p>
          </li>
        ))}
        <form className="w-100"
          onSubmit={handleSubmit}>
          <div className="w-100">
            <div className="col-lg-3">
              <label htmlFor="title">
                Title:
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div className="col-lg-3">
              <label htmlFor="description">
                Description:
                <input
                  className="form-control"
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="">
            <label htmlFor="date">
              Date:
              <input
                className="form-control"
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="time">
              Time:
              <input
                className="form-control"
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>
          <button type="button" class="btn btn-light">Add Trip</button>
        </form>
      </div>


    </div>
  );
}

export default MyTrips;
