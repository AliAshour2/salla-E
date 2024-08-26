import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./IconButton.module.css"; 

const IconButton = ({ to, tooltip, iconClass, onClick, isLink = true }) => {
  const content = (
    <div onClick={onClick} className={styles.cartProductActionButton}>
      <div className="p-1">
        <i className={iconClass}></i>
      </div>
    </div>
  );

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
      {isLink ? <Link to={to}>{content}</Link> : content}
    </OverlayTrigger>
  );
};

export default IconButton;
