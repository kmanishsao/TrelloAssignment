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
  getMarkup(id) {
    let el = document.createElement('div');
    el.id = id;
    el.className="list";
    el.innerHTML = this.Markup;
    let anchor = el.querySelector('#addCard');
    anchor.addEventListener('click', () => this.addCard(event));
    return el;
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
    let resourceId = list.offsetParent.parentNode.id;
    let msg = [];
    let readList = list.querySelectorAll("li");
    readList.forEach(function (item, index) {
      if (item.innerText != undefined && item.innerText.trim() != "" && item.innerText != null) {
        msg.push(item.innerText);
      }
    })

    let messageList = {
      message: msg
    };

    this.CardService.postCard(messageList, resourceId, "PUT");
  }

  saveCardId(id){
    let message={"id":id};
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
                            To DO
                        </div>
                    <ul class="list-group list-group-flush">
                    <a href="#"><li class="button-link"></li></a>   
                    </ul>
                    <a href="#" id="addCard">+ Add another card</a>
                </div>`;

Card.InputItem = `  <div  class="cards">
                        <textarea id="txtArea" placeholder="Enter a title for this card .." style="height:54px;" autofocus></textarea>
                    
                      <input type="submit" class="btn btn-success" value="Add Card" id="saveList"></input>
                      <input type="submit" class="btn btn-success" value="X" id="cancelList"></input>
                      </div>`;