import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/style.css';
import 'jquery';
import 'bootstrap';
import {
    Card
} from './Cards/Card';
import {
    CardApps
} from './Cards/CardApps';
import {
    CardService
} from './Services/CardService';
import {
    Boards
} from './Cards/Boards';

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
        promise.then(successCallback, failureCallback);


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

/* events fired on the draggable target */
document.addEventListener("drag", function( event ) {
 
    event.dataTransfer.setData("text",event.target.innerHTML);
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
    debugger;
    // prevent default action (open as link for some elements)
    event.preventDefault();
     
    event.target.parentElement.appendChild(dragged);
  
}, false);