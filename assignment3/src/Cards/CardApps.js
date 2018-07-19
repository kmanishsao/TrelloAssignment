import { Card } from './Card';


export class CardApps {
    constructor() {
        
         this.cardContainer =  document.querySelector("#plh");
         this.card=new Card();
    };

    saveCard() {
    
        card.setMessage();
    }

    cancelCard() {
        alert('cancel');
    }

     resetMaterialtextfield(element){
        element.value='';
    }

    addCards(card,boardId,boardName,cards){
        let cardItem= this.card.getMarkup(card);
        //add card to the database
        this.card.saveCardId(card,boardId,boardName,cards);
        return cardItem;
    }

    displayCard(cards){
            let element = this.card.getMarkup(cards.id,cards.header);
            if(cards.message != undefined && cards.message!=null){
            let listCollection="";
            let lstItems= element.querySelector("ul");
             cards.message.map((item)=>{
                 listCollection=`<li class="button-link">${item}</li><input type="text" style="display:none;" />`;
                 if(lstItems!= undefined && lstItems!=null){
                     let anchortag = document.createElement("a");
                     anchortag.href="#";
                     anchortag.innerHTML = listCollection;
                     lstItems.appendChild(anchortag);
                 }
             })
          
        }
            this.cardContainer.appendChild(element);
    }

}


 