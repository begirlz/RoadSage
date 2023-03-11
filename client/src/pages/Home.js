import React from "react";

const Home = () => {

  const pageName = window.location.pathname;

  if (pageName === "/") {
    document.body.classList.add("homepage", "d-flex", "justify-content-center", "align-items-center");
  }
  
console.log(window.location.pathname)

  return (

    <div className="d-flex justify-content-center">
      <div className="col-lg-8">
        <h1 className="text-muted ">The trip planner that gives you <span className='peace'>PEACE</span> instead of <span className="roadrage">ROAD RAGE</span></h1>
      </div>

    </div>

    // </div>

    // <div className="homepage container-fluid d-flex justify-content-center align-item-center">
    //   <div >
    //     <h1 className="text-muted">The trip planner that gives you <span className='peace'>PEACE</span> instead of <span className="roadrage">ROAD RAGE</span></h1>
    //   </div>
    // </div>

  );
};

export default Home;