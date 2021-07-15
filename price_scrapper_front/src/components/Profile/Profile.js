import React from 'react';
import './Profile.css';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const Profile = () => {

    const [items, setItems] = useState([]);
    const [wish, setWish] = useState([]);
    useEffect(() => {
        axios.get('/api/getRecentlyViewed').then(response => setItems(response.data))
        axios.get('/api/getWishlist').then(response => setWish(response.data))
    }, [])

    function createViewedList() {
        return items.map(
            (item, index) => {
                return <ProductCard key={index} cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL}  />
            }
        )
    }

    function createWishlist() {
        return wish.map(
            (item, index) => {
                return <ProductCard key={index} cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
            }
        )
    }

    return (
        <div className="profileDiv">
            <div>
                <h1>Recently Viewed</h1>
                <ul className="viewedList">
                    {createViewedList}
                </ul>
            </div>
            <div>
                <h1>Wishlist</h1>
                <ul className="wishList">
                    {createWishlist}
                </ul>
            </div>
        </div>
    );
};

export default Profile;