export const savingToStorage = (token) => {
    localStorage.setItem("token", token);
    return {
        type: "token",
        token
    };
};

export const ChosenItem = item => {
    return {
        type: 'item',
        item
    };
};

export const similarItems = items => {
    return {
        type: 'items',
        items
    };
};

export const sendRatingToReducer = rating => {
    return {
        type: 'rating',
        rating
    };
};

