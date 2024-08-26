import React, { useState } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'
import ItemPlaceholder from '../Item/ItemPlaceholder'
import { axios } from 'axios';
import styles from './BestSelling.module.css'
import { Link } from 'react-router-dom';



const BestSellingItem = ({title , price , rating , imageUrl}) => {

   
    const [isLoading, setIsLoading] = useState(true);


  return (
    <>
       <div className="col">
      <div className={`cart rounded-1 ${styles.cardProduct}`}>
        <div className="cart-body p-3">
          {/* Is LOADING */}

          {isLoading && (
            <>
              <ItemPlaceholder />
            </>
          )}

          {/* IS LOADING */}

          {!isLoading && (
            <>
              <div className="text-center position-relative">
                <Link to={``}>
                  <img
                    className="w-100 h-25"
                    src={`url(${imageUrl})` }
                    alt="product img"
                  />
                </Link>
               
              </div>
              <div
                className="text-sm-start mb-1 mt-1"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={title}
              >
                <Link className="text-muted text-decoration-none h6">
                  {title.split(" ").splice(0, 2).join(" ")}
                </Link>
              </div>
             

              <div className="text-warning ">
                <small>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffc107"
                    starDimension="20px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </small>
                <span className="text-muted small px-2">{rating}</span>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="text-dark">{price} EGY</div>
                
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default BestSellingItem
