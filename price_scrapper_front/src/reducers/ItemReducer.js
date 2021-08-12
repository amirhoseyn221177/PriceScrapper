import '../components/Actions/actions';

const initalState = {
    title: "",
    vendor: "",
    price: 0,
    currency: "",
    image: "",
    itemURL: ""
};


const reducer = (state = initalState, action) => {
    if (action.type === "item") {
        return {
            ...state,
            title: action.item.title,
            vendor: action.item.vendor,
            price: action.item.price,
            currency: action.item.currency,
            image: action.item.image,
            itemURL: action.item.itemURL

        };

    }
    return state;
};



export default reducer;