import '../components/Actions/actions';

const initialState = 0;

const reducer = (state = initialState, action) => {
    if (action.type === 'rating') {
        return action.rating;
    }

    return state;
};


export default reducer;