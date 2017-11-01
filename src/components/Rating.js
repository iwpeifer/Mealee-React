import React from 'react';

export default (props) => {
  let color = 'rgb(55,55,55)';

  if (props.business.rating > props.opponent.rating && props.business.review_count >= props.opponent.review_count / 2) {
    color = 'rgb(73,167,76)';
  }

  if (props.business.rating === props.opponent.rating && props.business.review_count > props.opponent.review_count) {
    color = 'rgb(73,167,76)';
  }

  return (
    <div className="business-rating" style={{ color }}>
      {props.business.rating}
    </div>
  );
};
