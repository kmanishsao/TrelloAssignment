
  
const reducerCard=(state={},action)=>{
    debugger;
    switch(action.type){
        case "INIT":
            return Object.assign({}, state);
        case "COMPLETED":
            return Object.assign({}, action.payload);

        default:
        return state;
    }
}

module.exports= reducerCard;
