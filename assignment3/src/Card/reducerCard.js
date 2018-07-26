
  
const reducerCard=(state={},action)=>{
 
    switch(action.type){
        case "INIT":
            return Object.assign({});
        case "COMPLETED":
            return Object.assign({}, action.payload);

        default:
        return state;
    }
}

module.exports= reducerCard;
