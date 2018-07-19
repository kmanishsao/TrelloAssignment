export class CardService {
    constructor() {
        this.geturl = CardService.url;
        this.fetchOption = CardService.fetchOption;
        this.PostOption=CardService.PostOption;
        this.deleteOption=CardService.deleteOption;
    }

    postBoards(item){
        let promise = new Promise((resolve, reject) => {
            let stringify = require('json-stringify-safe');
            fetch('http://127.0.0.1:3000/cardBoards', {               
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control':'no-cache'
                },
                method: "post",
                body:stringify(item)
            }).then(
                res => res.json()
            ).then(json => {

                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }
    getBoards(){
        let url =`http://127.0.0.1:3000/cardBoards`
        let promise = new Promise((resolve, reject) => {
            
            fetch(url, this.fetchOption).then(
                res => res.json()
            ).then(json => {

                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }

    getCard(BoardId) {
        let url =`http://127.0.0.1:3000/cardBoards/${BoardId}/cards`
        let promise = new Promise((resolve, reject) => {
            
            fetch(url, this.fetchOption).then(
                res => res.json()
            ).then(json => {

                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }

    deleteCard(resourceId){
        let promise = new Promise((resolve, reject) => {
         let  url=this.geturl+"/"+resourceId;
            fetch(url, this.deleteOption).then(
                res => res.json()
            ).then(json => {
                resolve(json);
            }, error => {
                reject(new ResponseError('Service Error' + error.message));
            })
        });
        return promise;
    }
    postCard(message,resourceId,methodverb,BoardId) {
       let url=`http://127.0.0.1:3000/Cards`;
        let promise = new Promise((resolve, reject) => {
            let stringify = require('json-stringify-safe');
          if(methodverb=="PUT"){
            url=`http://127.0.0.1:3000/cards/`+resourceId;
          }
          
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
CardService.deleteOption = {
    method: 'Delete',
    headers: {
        'Content-Type': 'application-json'
    },
    mode: 'cors',
}
CardService.url = `http://127.0.0.1:3000/Cards`;