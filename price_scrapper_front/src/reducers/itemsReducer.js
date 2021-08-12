import '../components/Actions/actions';

const allTheSimilarItems = [];


const reducer = (state = allTheSimilarItems, action) => {
    if (action.type === "items") {
        return action.items;

    }
    return state;
};

export default reducer;