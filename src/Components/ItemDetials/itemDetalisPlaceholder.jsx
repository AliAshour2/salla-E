import React from "react";

function itemDetalisPlaceholder() {
  return (
    <>
      <div className="my-5">
        <div className="d-flex" aria-hidden="true">
          <div className="col-md-6">
          <div className="col-md-6 ms-auto pe-3"><img  className="card-img   placeholder" width={"50px"} height={"400px"} alt="" /></div>
          </div>
          <div className="col-md-6">
          <div>
            <p className="card-text placeholder-glow  py-2">
            <span className="placeholder col-1" />
            <span className="placeholder col-2" />
              <span className="placeholder col-4" />
              <span className="placeholder col-4" />
              <span className="placeholder col-6" />
              <span className="placeholder col-4" />
              <span className="placeholder col-2" />
              <div className=" placeholder-glow">
              <span className="placeholder col-2 me-2" />
              <span className="placeholder col-2" />
              </div>
            </p>
            <button className="btn btn-sm disabled btn-success placeholder col-6 me-2" aria-disabled="true"></button>
            <button className="btn btn-sm disabled btn-dark placeholder col-2" aria-disabled="true"></button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default itemDetalisPlaceholder;
