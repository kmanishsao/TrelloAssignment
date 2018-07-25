import { cardView } from './cardView';
import ServerDom from '../boot/ServerDom';

export const cardContainer = (payload) =>{
   debugger;
   if(Object.keys(payload.reducerCard).length > 0){
        let messageList = getCardList(payload.reducerCard);
       let result= cardView(messageList);
       alert(result);
 
   }
}


const getCardList=(...carddata)=>{
      let result;
      carddata.forEach(item=>{
            let index=0;
           if(item!=null && item != undefined && item[index] != undefined){
            result=Object.assign([], item[index].message);
                 
            }
      });
      return result;
}
 
  