import { tmpdir } from "os";

  
  export const ServerDom=(html,id)=>{
      const template = document.createElement('div');
      template.id=id;
      template.className= "list";
      template.draggable="true";
      template.innerHTML = html;
      return template;
  }
