
import { cardView } from './cardView';
import {ServerDom} from '../boot/ServerDom';

export const cardContainer = (payload) =>{
   if(Object.keys(payload.reducerCard).length > 0){
        getCardList(payload.reducerCard);
   }
}

const updateView=(divID,domElement)=>{
      let divElement =document.getElementById("plh");
      divElement.appendChild(ServerDom(domElement,divID));     
}

const getCardList=(...carddata)=>{
      let result;
      carddata.map(item=>{
            let index=0;
           while(item!=null && item != undefined && item[index] != undefined){
            result= cardView(Object.assign([], item[index].message),item[index].header);
            updateView( item[index].id,result);
            index=index+1;
           }
      });
}
 
  