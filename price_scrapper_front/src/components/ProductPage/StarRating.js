import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa"

const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);



    // useEffect(()=>{
    //     console.log(props.ratingValue)
    //     setRating(props.ratingValue)
    // },[props.ratingValue])

    var addRating = async(tempRating)=>{
        try{
            console.log(tempRating)
            setRating(tempRating)
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/user/userinfo', {
                headers: {
                    "Authorization": token
                }
            })
            const userInfo = await resp.data
            let firstName = userInfo.Name
            var itemURL = props.itemFromPath.itemURL;
            var title = props.itemFromPath.title;
            var newRating = {
                itemURL,
                title,
                firstName,
                rating
            };
            const response = await axios.post('/api/items/getRating', newRating, {
                headers: {
                    "Authorization": token
                }
            });
            const data = await response.data
            console.log(data)
        }catch(e){
            console.log(e.message)
        }
    }
    
    return (
        <div>
            Rating:
            {[...Array(5)].map((star, i) => {
                const tempRating = i + 1;
                return (
                    <label key={i}>
                        <input
                        disabled={true}
                            type="radio"
                            name="rating"
                            value={rating}
                        />
                        <FaStar
                            className="star"
                            color={tempRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={15}
                            onClick={()=>{addRating(tempRating)}}
                            onMouseEnter={() => setHover(tempRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating