 
  import {Store} from './Store';
  import {cardContainer} from '../Card/card';

  Store.subscribe(handler);
  
  
  function handler(){
    debugger;
    let state=Store.getState();
 
    if (!$.isEmptyObject(state) && state !={})
      cardContainer(state);
 
  }


