import React from "react";
import heartOpen from "../../assets/icons/heart_open.svg";
import heartFull from "../../assets/icons/heart_full.svg";

function Like({ liked = false }) {
  return (
    <img
      src={liked ? heartFull : heartOpen}
      alt={liked ? 'liked' : 'like'}
      className='side-info like'
    />
  );
}

export default Like;
