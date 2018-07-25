export const cardView = (cardMessage) => 
 `<ul class="list-group list-group-flush">
        ${cardMessage.map(item => `
        <li>${item}</li>
        `)}
   </ul>`;
