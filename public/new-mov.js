window.onload = () => {

    submitMovie.onclick = submitMovieReq;

};

function submitMovieReq() {

    let reqBody = {};

    for (const input of newMovieForm) {
        reqBody[input.name] = input.value
    }


    reqBody.inventory = {avaialable: reqBody.available, rented: 0};
    
    console.log(reqBody)

    
const endpoint = `${location.origin}/movie/post`;

reqObj = {

    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'content-type': 'application/json'

    },


    method: 'POST',
    body: JSON.stringify(reqBody)

}



fetch(endpoint, reqObj)
.then(rs => {return rs.json()})
.then(response => {
    console.log(response)
})

}