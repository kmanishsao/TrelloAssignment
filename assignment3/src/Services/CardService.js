export class CardService {
    constructor() {
        this.geturl = CardService.url;
        this.fetchOption = CardService.fetchOption;
        this.PostOption=CardService.PostOption;
    }

    getCard() {
        let promise = new Promise((resolve, reject) => {

            fetch(this.geturl, this.fetchOption).then(
                res => res.json()
            ).then(json => {

                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }

    
    postCard(message,resourceId,methodverb) {
        let promise = new Promise((resolve, reject) => {
            let stringify = require('json-stringify-safe');
            let url="";
            if(methodverb=="PUT")
                url=this.geturl+"/"+resourceId;
            else
                url =this.geturl;
            fetch(url,  {
               
                headers: {
                    'content-Type': 'application/json'
                },
                method: methodverb,
                body: stringify(message)
            }).then(
    
                res => res.json()
            ).then(json => {

                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        debugger;
        return promise;
    }



}

CardService.fetchOption = {
 
    headers: {
        'Content-Type': 'application-json'
    },
    mode: 'cors',
}
CardService.PostOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application-json'
    },
    mode: 'cors',
}

CardService.url = `http://127.0.0.1:3000/Cards`;