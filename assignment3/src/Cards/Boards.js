import {
    CardService
} from '../Services/CardService';

export class Boards {
    constructor() {
        this.newBoard = document.querySelector("#btnSave");
        this.placeHolder=document.querySelector("#dvBoard");
        this.BoardMarkup=Boards.TEMPLATE;
        this.newBoard.addEventListener("click", () => this.addBoard(event));
        this.service = new CardService();
    }

    addBoard(event) {
        let element = event.currentTarget.offsetParent.querySelector("#txtName");
        let name=element.value;
      
        let promise=this.saveBoard(name);
        promise.then((result)=>{
            $("#ulBoard").append( this.BoardMarkup.replace("$$NAME$$",name).replace("#id#",result.id));
        });
    }

    getBoards(){
        let promise=this.service.getBoards();
        promise.then((result)=>{
            if(!$.isEmptyObject(result)) {
                result.map((item)=>{
                    $("#ulBoard").append( this.BoardMarkup.replace("$$NAME$$",item.name).replace("#id#",item.id));
                })
            
            }
        });
    }

    renameBoard() {

    }
    
    saveBoard(names) {
         let messageList = {
            "name":`${names}`,
            cards:[]
        };
       return  this.service.postBoards(messageList);

    }

}

Boards.TEMPLATE=`<li></li> <a href="#" id="#id#">
<i class="fa fa-search"></i>$$NAME$$
</a></li>`;