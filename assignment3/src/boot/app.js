 
  import {Store} from './Store';
  import {cardContainer} from '../Card/card';

  Store.subscribe(handler);
  
  
  function handler(){
    let state=Store.getState();
    if (!$.isEmptyObject(state) && state !={})
      cardContainer(state);
 
  }


