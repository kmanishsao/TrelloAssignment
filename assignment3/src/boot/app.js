  const createHTMLElement=(html)=>{
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }


  module.exports=createHTMLElement;