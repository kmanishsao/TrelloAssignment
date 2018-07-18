import { Card } from './Card';


export class CardApps {
    constructor() {
        
         this.cardContainer =  document.getElementById("plh");
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

    addCards(card){
        let cardItem= this.card.getMarkup(card);
        //add card to the database
        this.card.saveCardId(card);
        return cardItem;
    }

    displayCard(cards){
            let element = this.card.getMarkup(cards.id,cards.header);
            if(cards.message != undefined && cards.message!=null){
            let listCollection="";
             cards.message.map((item)=>{
                 listCollection=listCollection+ `<li class="button-link">${item}</li>`;
             })
            let lstItems= element.querySelector("ul");
            if(lstItems!= undefined && lstItems!=null){
                let anchortag = document.createElement("a");
                anchortag.href="#";
                anchortag.innerHTML = listCollection;
                lstItems.appendChild(anchortag);
            }
        }
            this.cardContainer.appendChild(element);
    }

}


 