window.onload = () => {

    //submitMovie.onclick = submitMovieReq;

    console.log(submitMovie);
    
    submitPatch.onclick = submitPatchReq;

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



function submitPatchReq() {

    if (idinput.value.trim() === ""|| input,value.trim().length != 24) return alert('a valid id must be provided')

    let reqBody = {};

    const endpoint = `${location.origin}/movie/patch/${movieId}`;


    for (const input of updateMovieForm) {

        const temp = input.value.trim();

        if(temp != '' && input.name != 'Id') {

            reqBody[input.name] = temp

    }
    }

    reqBody.inventory = {avaialable: reqBody.available, rented: 0};
    
    console.log(reqBody)

    
reqObj = {

    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'content-type': 'application/json'

    },


    method: 'PATCH',
    body: JSON.stringify(reqBody)

}



fetch(endpoint, reqObj)
.then(rs => {    
    return rs.json()})
.then(response => {
    console.log(response)
})

}