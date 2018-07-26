export const cardView = (cardMessage,header) => 
 `<div class="card" style="width: 18rem;">
        <div class="card-header">
            <span id="spntitle">${header}</span>
            <input type="text" style="display:none" id="inTitle" autofocus/>
        </div>
    <a href="#" style="float:right;" id="addArchive">...</a>
        <ul class="list-group list-group-flush">
            ${cardMessage.map((item) =>`<a href="#"><li class="button-link">${item}</li><input type="text" style="display:none;" /></a>`).join('')}
        </ul>
    <div> <a href="#" id="addCard">+ Add another card</a></div>
    </div>`;


    export const addCardView =()=>
         `  <div  class="cards">
                        <textarea id="txtArea" placeholder="Enter a title for this card .." style="height:54px;" autofocus></textarea>
                    <br/>
                      <input type="submit" class="btn btn-success" value="Add Card" id="saveList"></input>
                      <input type="submit" class="btn btn-success" value="X" id="cancelList"></input>
                      </div>`;