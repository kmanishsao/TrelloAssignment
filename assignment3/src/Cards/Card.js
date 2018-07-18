import {
  CardService
} from '../Services/CardService';

export class Card {
  constructor() {
    this.Markup = Card.TEMPLATE;
    this.AddCard = Card.InputItem;
    this.plhHolder = document.getElementById('plh');
    this.currentItem = null;
    this.CardService = new CardService();

  }
  // Sets the message of the note.
  getMarkup(id,header) {
    let el = document.createElement('div');
    el.id = id;
    el.className = "list";
    el.innerHTML = this.Markup;
    let anchor = el.querySelector('#addCard');
    anchor.addEventListener('click', () => this.addCard(event));
    let clickEvent = el.querySelector(".card-header");
    if(header!=undefined && header!=null && header!=""){
      el.querySelector("#spntitle").innerText=header;
    }
    clickEvent.addEventListener('click', () => this.updateHeader(event));
    return el;
  }

  updateHeader(event) {
    let ele = event.target;
    let spn = ele.firstElementChild;
    spn.setAttribute("style", "display:none");
    let inpt = ele.lastElementChild;
    inpt.setAttribute("style", "display:block");
    inpt.onblur = () => this.outOfFocus(inpt, spn,event);
  }

  outOfFocus(inputElement, spanElement,event) {
    spanElement.innerText = inputElement.value;
    spanElement.setAttribute("style", "display:block");
    inputElement.setAttribute("style", "display:none");
    debugger;
    this.saveList(spanElement);
  }

  saveHeader(event,headerValue){
    let element=event.offsetParent;
    let payload={};

  }

  ArchiveCard(){

  }
  addCard(element) {
    let docElement = document.createElement('div');
    docElement.innerHTML = this.AddCard;
    element.target.appendChild(docElement);
    this.currentItem = 'txtArea';
    let txtele = element.target.querySelector('textarea');
    txtele.addEventListener('onblur', () => this.resetMaterialTextfield(element));
    element.target.querySelector('#saveList').addEventListener('click', () => this.readCard(txtele));
    element.target.querySelector('#cancelList').addEventListener('click', () => this.resetMaterialTextfield(txtele));
  }

  readCard(el) {
    let cardList = el.value;
    if (el.value != "") {
      //Append to the list
      let anchortag = document.createElement("a");
      anchortag.href = "#";
      anchortag.innerHTML = `<li class="button-link">${cardList}</li>`;
      el.offsetParent.querySelector("ul").appendChild(anchortag);
      this.saveList(el.offsetParent.querySelector("ul"));
    }
    let rmNode = el.offsetParent.querySelector(".cards");
    rmNode.parentNode.removeChild(rmNode);

  }

  saveList(list) {
    debugger;
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
      header:headerText.innerText,
      message: msg
    };

    this.CardService.postCard(messageList, resourceId, "PUT");
  }

  saveCardId(id) {
    let message = {
      "id": id
    };
    this.CardService.postCard(message, id, "POST");

  }

  resetMaterialTextfield(element) {
    element.value = '';
    let rmNode = element.offsetParent.querySelector(".cards");
    rmNode.parentNode.removeChild(rmNode);
  }
}

Card.TEMPLATE = `<div class="card" style="width: 18rem;">
                         <div class="card-header">
                            <span id="spntitle">To Do</span>
                            <input type="text" style="display:none" id="inTitle" autofocus/>
                           
                        </div>
                        <a href="#><span style="float:right" title="Archive Card"  >...</span></a>
                    <ul class="list-group list-group-flush">
                    </ul>
                    <a href="#" id="addCard">+ Add another card</a>
                </div>`;

Card.InputItem = `  <div  class="cards">
                        <textarea id="txtArea" placeholder="Enter a title for this card .." style="height:54px;" autofocus></textarea>
                    
                      <input type="submit" class="btn btn-success" value="Add Card" id="saveList"></input>
                      <input type="submit" class="btn btn-success" value="X" id="cancelList"></input>
                      </div>`;