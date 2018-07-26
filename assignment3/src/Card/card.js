
import { cardView,addCardView } from './cardView';
import {ServerDom} from '../boot/ServerDom';
import { CardService } from '../Services/CardService';
    
let boardId;
let boardName;
let cardService =new CardService();
export const cardContainer = (payload) =>{
   if(Object.keys(payload.reducerCard).length > 0){
        getCardList(payload.reducerCard);
   }
}
const ArchiveCard=(event)=>{
      let id =event.target.parentNode.parentElement.id
      cardService.deleteCard(id);
      $(event.target.parentNode.parentElement).remove();
      }

const addCard=(event)=>{
    let docElement = document.createElement('div');
    docElement.innerHTML = addCardView();
    event.target.appendChild(docElement);
    let txtele = event.target.querySelector('textarea');
    txtele.addEventListener('onblur', () => resetMaterialTextfield(event));
    event.target.querySelector('#saveList').addEventListener('click', () => readCard(txtele));
    event.target.querySelector('#cancelList').addEventListener('click', () => resetMaterialTextfield(txtele));
}

 const readCard=(el)=> {
      let cardList = el.value;
      if (el.value != "") {
        //Append to the list
        let anchortag = document.createElement("a");
        anchortag.href = "#";
        anchortag.innerHTML = `<li class="button-link">${cardList}</li><input type="text" style="display:none;" />`;
        el.offsetParent.querySelector("ul").appendChild(anchortag);
        saveList(el.offsetParent.querySelector("ul"));
      }
      let rmNode = el.offsetParent.querySelector(".cards");
     
      rmNode.parentNode.removeChild(rmNode);
      // rmNode.parentNode.querySelector("a").innerText="# Add to Card";
    }    
 const resetMaterialTextfield=(element) =>{
      element.value = '';
      let rmNode = element.offsetParent.querySelector(".cards");
      rmNode.parentNode.removeChild(rmNode);
    }

const editList=(event)=>{
      event.target.style.display="none";
      event.target.nextSibling.style.display="block";
      event.target.nextSibling.focus();
      event.target.nextSibling.onblur=()=>editInputList(event);
      }
        
 const editInputList=(event)=>{
            event.target.innerText=event.target.nextSibling.value;
            event.target.style.display="block";
            event.target.nextSibling.style.display="none";
            saveList(event.target.offsetParent.querySelector("ul"));
          }
        
  const updateHeader=(event) =>{
            let ele = event.target;
            let spn = ele.firstElementChild;
            spn.setAttribute("style", "display:none");
            let inpt = ele.lastElementChild;
            inpt.setAttribute("style", "display:block");
            inpt.onblur = () => outOfFocus(inpt, spn,event);
          }
        
const outOfFocus=(inputElement, spanElement,event) =>{
            spanElement.innerText = inputElement.value;
            spanElement.setAttribute("style", "display:block");
            inputElement.setAttribute("style", "display:none");
            saveList(spanElement);
          }
        
 const Archive=(id)=>
          {
            cardService.deleteCard(id);
          }
         

const saveList=(list)=> {
            let resourceId = list.offsetParent.parentNode.id;
            let domObject=list.offsetParent.parentNode;
            let headerText =domObject.querySelector("#spntitle");
            domObject=domObject.querySelector("ul").querySelectorAll("li");
            let msg = [];
            domObject.forEach(function (item, index) {
              if (item.innerText != undefined && item.innerText.trim() != "" && item.innerText != null) {
                msg.push(item.innerText);
              }
            })
        
            let messageList = {
              cardBoardId: boardId,
              boardname:boardName,
              header:headerText.innerText,
              message: msg
            };
         
            cardService.postCard(messageList, resourceId, "PUT");
          }
        
      const saveCardId=(id,boardId,boardName,cards)=> {
            this.boardName=boardName;
            this.boardId=boardId;
            let message = {
              "cardBoardId": boardId,
              "boardname":boardName,
              "id":id
            };
            cardService.postCard(message, id, "POST",boardId);
        
          }
        

const updateView=(divID,domElement)=>{
      let el = document.getElementById("plh");
      let updatedV=ServerDom(domElement, divID);
      el.appendChild(updatedV);
      let anchor = updatedV.querySelector('#addCard');
      let archive = updatedV.querySelector("#addArchive");
      archive.addEventListener('click', () => ArchiveCard(event));
      anchor.addEventListener('click', () => addCard(event));
      let clickEvent = updatedV.querySelector(".card-header");
      clickEvent.addEventListener('click', () => updateHeader(event));
      updatedV.querySelector("ul").addEventListener("click", () => editList(event));
   
}

const getCardList=(...carddata)=>{
      let result;
      carddata.map(item=>{
            let index=0;
           while(item!=null && item != undefined && item[index] != undefined){
                 boardId=item[index].cardBoardId;
                 boardName=item[index].boardname;
                 console.log("**", item[index].message);
                 debugger;
            result= cardView(item[index].message,item[index].header);
            updateView( item[index].id,result);
            index=index+1;
           }
      });
}
