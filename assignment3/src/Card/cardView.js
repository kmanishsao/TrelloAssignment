export const cardView = (cardMessage) => 
 `<ul class="list-group list-group-flush">
        ${cardMessage.map(item => `
        <a href="#"><li class="button-link">${item}</li><input type="text" style="display:none;" /></a>
         `)}
   </ul>`;
