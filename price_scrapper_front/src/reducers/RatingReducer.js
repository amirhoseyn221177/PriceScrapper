import '../components/Actions/actions'
 
const initialState = 0

const reducer = (state = initialState, action)=>{
    if(action.type === 'rating'){
        console.log("this is reducer"+ action.rating)
        return action.rating
    }

    return state
}


export default reducer