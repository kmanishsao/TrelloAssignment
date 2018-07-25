import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/style.css';
import 'jquery';
import 'bootstrap';
import { Card} from './Cards/Card';
import {CardApps} from './Cards/CardApps';
import {CardService} from './Services/CardService';
import {Boards} from './Cards/Boards';
import {Store} from './boot/Store';
import {app} from './boot/app';

let BoardId = 1;
let BoardName="";
let cardId = 1;
let cards=[];
let service = new CardService();

let _cardApps = new CardApps();
let _cardPlh=document.getElementById("plh");
function failureCallback(error) {
    console.log(error)
}

let _card = new Card();

let Board = new Boards();
let loadBoards = Board.getBoards();


$(function () {
    $('#ulBoard').on('click', function (event) {
 
        _cardPlh.innerHTML="";
        //Fetch Cards
        let liElement = event.target;
        
        BoardId = event.target.parentElement.id;
        BoardName=liElement.innerText;
        _card.boardId=BoardId;
        _card.boardName=BoardName;
        let promise = service.getCard(BoardId);
        function successCallback(result) {
           
            if (!$.isEmptyObject(result)) {
                cards=result.cards;
                result.map((item) => {
                    _cardApps.displayCard(item);
                    cardId = item.id;
                });
            }
         
        }
    })
    $('#Boards').on('click', function () {
        if ($("#dvBoard").is(":visible")) {
            $("#dvBoard").hide();

        } else {
            $("#dvBoard").show();
        }
    });
});

document.getElementById('add').addEventListener('click', function () {
    _cardPlh.appendChild(_cardApps.addCards(++cardId, BoardId,BoardName,cards));
    //Post card Number in the database
});
 

//Drag and drop

var dragged;
var previousElement;

/* events fired on the draggable target */
document.addEventListener("drag", function( event ) {
    previousElement= event.target.offsetParent.parentNode.id;
 

    
}, false);

document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
 
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
   
}, false);

document.addEventListener("dragend", function( event ) {
    // reset the transparency
    event.target.style.opacity = "";
   
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
 
}, false);

document.addEventListener("drop", function( event ) {
 
    // prevent default action (open as link for some elements)
    event.preventDefault();

    let docEl=document.getElementById(previousElement);
if(event.target.nodeName.toUpperCase() =='LI' || event.target.nodeName.toUpperCase() == 'A'){
    event.target.offsetParent.querySelector("ul").appendChild(dragged);
    _card.saveList( event.target);
    let de=docEl.querySelector("li");
    if(de=="" || de == "undefined" || de == null)
    {
        de= de=docEl.querySelector("ul");
    }
    _card.saveList(de);
    
}

if(event.target.nodeName.toUpperCase() == 'MAIN'){
    event.target.appendChild(dragged);
}
  
}, false);