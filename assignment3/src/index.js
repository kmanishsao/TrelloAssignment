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
        debugger;
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

 
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
 