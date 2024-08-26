import React from 'react'
import styles from './NotFound.module.css'

import error from '../assets/images/error.png'
function NotFound() {
  return (
    <div className="container ms-auto my-5 d-flex justify-content-center align-items-center">
      <img className='w-25 ' src={error} alt="" />
    </div>
  )
}
 
export default NotFound