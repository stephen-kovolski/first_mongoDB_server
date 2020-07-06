window.onload = () => {

    submitMovie.onclick = submitPatchReq;

};

function submitPatchReq() {

    let reqBody = {};

    for (const input of updateMovieForm) {

        if(input.name == 'Id') {

            movieId = input.value

    } else {

        reqBody[input.name] = input.value

    }
    }

    reqBody.inventory = {avaialable: reqBody.available, rented: 0};
    
    console.log(reqBody)

    
const endpoint = `${location.origin}/movie/patch/${movieId}`;

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
.then(rs => {return rs.json()})
.then(response => {
    console.log(response)
})

}