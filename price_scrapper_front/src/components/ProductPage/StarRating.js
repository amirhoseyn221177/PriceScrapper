import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { connect } from 'react-redux';
import { sendRatingToReducer } from '../Actions/actions';

const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        addRating();
    }, [rating]);

    var addRating = async () => {
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/user/userinfo', {
                headers: {
                    "Authorization": token
                }
            });
            const userInfo = await resp.data;
            let firstName = userInfo.Name;
            var itemURL = props.itemFromPath.itemURL;
            var title = props.itemFromPath.title;
            var newRating = {
                itemURL,
                title,
                firstName,
                rating
            };
            await axios.post('/api/items/sendRating', newRating, {
                headers: {
                    "Authorization": token
                }
            });
            props.sendRating(rating);

        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div>
            <h3>Your Rating</h3>
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
                            onClick={() => { setRating(tempRating); }}
                            onMouseEnter={() => setHover(tempRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

const mapToProps = dispatch => {
    return {
        sendRating: rating => dispatch(sendRatingToReducer(rating))
    };
};

export default connect(null, mapToProps)(StarRating);