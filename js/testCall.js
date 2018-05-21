const url = "";

let h = new Headers();
h.append('Accept', 'application/json');

let req = new Request(url, {
    method: 'GET',
    headers: h,
    mode: 'cors'
});


fetch(req)
    .then( (response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad response');
        }
    })
    .then( (jsonData)=>{
        
    })
    .catch( (err)=>{
        console.log('ERROR:', err.message);
    });