import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa"

const StarRating = (props) => {
    const [rating, setRating] = useState(props.ratingValue);
    const [hover, setHover] = useState(null);


    useEffect(()=>{
        setRating(props.ratingValue)
    },[props.ratingValue])
    
    return (
        <div>
            Rating:
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={rating}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={15}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating
