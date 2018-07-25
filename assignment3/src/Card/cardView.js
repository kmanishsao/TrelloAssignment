

export const cardTemplate=()=>{
    `<ul class="list-group list-group-flush">
         ${cardContainer.map((value)=>{
             <a href="#">
                <li class="button-link">${value}</li>
                <input type="text" style="display:none;"/>
            </a>
         })
        }
     </ul>`;
 };