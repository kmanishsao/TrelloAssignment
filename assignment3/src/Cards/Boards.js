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
        //$("#ulBoard").on("click",()=>this.renameBoard(event));
    }

    renameBoard(event) {
       event.target.style.display="none";
        event.target.nextSibling.style.display="block";
        event.target.nextSibling.focus();
        event.target.nextSibling.onblur=()=>this.editHeader(event);
    }
    editHeader(event){
        debugger;
        let pid=event.target.parentElement.id;
        event.target.innerText=event.target.nextSibling.value;
        event.target.style.display="block";
        event.target.nextSibling.style.display="none";
       this.updateBoard(pid,event.target.nextSibling.value);
    }
    updateBoard(pid,names){
        let messageList = {
            "id":pid,
            "name":`${names}`,
      
        };
       return  this.service.postBoards(messageList,"PUT",pid);

    }

    saveBoard(names) {
         let messageList = {
            "name":`${names}`,
            cards:[]
        };
       return  this.service.postBoards(messageList);

    }

}

Boards.TEMPLATE=`<li><a href="#" id="#id#">
<span class="fa fa-search">$$NAME$$</span><input type="text"  style="display:none" id="boardHeader" autofocus>
</a></li>`;