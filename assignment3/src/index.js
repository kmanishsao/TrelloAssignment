import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/style.css';
import 'jquery';
import 'bootstrap';
import { Card } from './Cards/Card';
import { CardApps } from './Cards/CardApps';
import { CardService } from './Services/CardService';


let cardId=1;
let service=new CardService();
let promise = service.getCard();
promise.then(successCallback, failureCallback);
let _cardApps =new CardApps();

function successCallback(result){
    result.map((item)=>{
        _cardApps.displayCard(item);
        cardId=item.id;
    });
}

function failureCallback(error){
    console.log(error)
}

let _card=new Card();
    document.getElementById('add').addEventListener('click',function(){
    document.getElementById("plh").appendChild(_cardApps.addCards(++cardId));
    //Post card Number in the database
});
