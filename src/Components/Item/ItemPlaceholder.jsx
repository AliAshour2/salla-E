import React from 'react'

function ItemPlaceholder() {
  return (
    <>
    <div
                className="placeholder-glow placeholder-glow w-100 mb-2"
                style={{
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                }}
              ></div>
              {/* fisrt row */}
              <div
                className="placeholder-glow w-100 mb-2"
                style={{
                  height: "20px",

                  borderRadius: "5px",
                }}
              >
                <span
                  className="placeholder w-100"
                  style={{ height: "20px", borderRadius: "8px" }}
                ></span>
              </div>
              {/* Sec row */}
              <div
                className="placeholder-glow w-100 mb-2"
                style={{
                  height: "20px",

                  borderRadius: "5px",
                }}
              >
                <span
                  className="placeholder w-100"
                  style={{ height: "20px", borderRadius: "8px" }}
                ></span>
              </div>
              
              {/* third row */}
              <div className="d-flex justify-content-between placeholder-glow">
                <span
                  className="placeholder col-4"
                  style={{ height: "25px", borderRadius: "8px" }}
                ></span>

                <button
                  className="btn btn-success placeholder  disabled col-4"
                  aria-disabled="true"
                ></button>
              </div>
    </>
  )
}

export default ItemPlaceholder