import { cardView } from './cardView';
import {ServerDom} from '../boot/ServerDom';

export const cardContainer = (payload) =>{
   if(Object.keys(payload.reducerCard).length > 0){
        getCardList(payload.reducerCard);
   }
}

const updateView=(divID,domElement)=>{
      let divElement =document.getElementById("plh");
      if(document.getElementById("plh").children.length > 0){
            let child=document.getElementById("plh").children;
         for(var item in child){
               if(child[item].id==divID){
                  child[item].querySelector("ul").innerHTML=domElement
                  break;
               }
         }
      }
}

const getCardList=(...carddata)=>{
      let result;
      carddata.forEach(item=>{
            let index=0;
           if(item!=null && item != undefined && item[index] != undefined){
                result= cardView(Object.assign([], item[index].message));
                updateView( item[index].id,result);
            }
      });
      
}
 
  