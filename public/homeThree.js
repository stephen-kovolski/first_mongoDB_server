//set event listeners for rent and return buttons
// set up xhr ('patch') in the onclick event handler
// proper reposnses to the client (alert, error element/dom element update)


window.onload = () => {

    console.log(document.cookie);

    setEventListeners()

    const editDivs = document.getElementsByClassName('editDivs');

            for (const div of editDivs){

                div.style.display = 'none'

            };

    const displayDivs = document.getElementsByClassName('displayDivs');
                
            for (const div of displayDivs){

            div.style.display = 'flex'

            };

    //clickMe.onclick = clickedBtn;  

    allMovies.style.display = 'flex';


}

function redirectAdmin() {
    location = location.origin+'/admin'
}

function setEventListeners() {

    const getMovie = document.getElementsByClassName('getMovie');

            for (const button of getMovie) {
                 button.onclick = reqSingleMovieData
            };

    //const deleteButtons = document.getElementsByClassName('getMovie');

            // for (const button of deleteButtons) {
            //      button.onclick = reqSingleMovieData
            // };

    const editMovieBtn = document.getElementsByClassName('editMovieBtn');

            for (const button of editMovieBtn) {
                 button.onclick = changeEditView
            };

    const editSubmitButtons = document.getElementsByClassName('submitEdit');

            for (const button of editSubmitButtons){

                button.onclick = submitEditReq

            };

    const rentBtn = document.getElementsByClassName('rentMovieBtn');
            for (const button of rentBtn) {

                button.onclick = rentMovie

            };    


    const returnBtn = document .getElementsByClassName('returnMovieBtn')
            for (const button of returnBtn)

                button.onclick = returnMovie


    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 
    const adminBtn = document.getElementById('adminPage') 
    

    


    if(loginBtn){

            loginBtn.onclick = loginUser;

    }

    if(logoutBtn) {

                logoutBtn.onclick = logoutUser;

    }

    if (adminBtn) {
        
        adminBtn.onclick = redirectAdmin

    }

    
}

function rentMovie() {

    const reqBody = {
        movieId: this.parentElement.id,
        isRenting: true
    }

    const endpoint = `${location}/user/rent_return`;

    const reqObj = {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: {
         'Access-Control-Allow-Origin': '*',
         Accept: 'Application/json',
         'content-type': 'application/json'
        },
    //req body
    //api req thats a patch
    //endpoint
    //parse messeage from api response, alert user

}


fetch(endpoint, reqObj)
.then(rs => {return rs.json()})
.then(res => {console.log(res)})
.catch(err => {
    console.log({
        error: err.message || err
    });
})

};

function returnMovie() {

}

function loginUser() {

    location = location.origin+'/login';

}

function logoutUser() {

    const token = document.cookie.indexOf('loginToken');

    if(token !== null) {
        document.cookie = `token=; expires=Thu, 01 Jan 1970; path=/;`
        alert('logged out')
        location.reload()

    } else {

        alert('you are not logged in')

    }

}

function submitEditReq() {

    

    const movieId = this.parentElement.parentElement.parentElement.id;
    const form = this.parentElement;

    console.log(movieId, form);

    let validationErr = [];

    let reqBody = {};

    

        for (const input of form) {

            let inputValue = input.value.trim();

            if (inputValue != '') {

                reqBody[input.name] = inputValue;

            }


           if (input.validationMessage != ''){
               
            validationErr.push(`${input.name}: ${input.validationMessage}`);

            }

            // if ( !(new RegExp(/imdb/).test(form.imdb_link)) )  {validationErr.push('IMDB Link provided was not valid')

            // }



           if (validationErr.length > 0) {

            const message = `Edit not made \n\n ${validationErr.join('\n')}`

            return alert(message)

           }

           

        }

        console.log(reqBody)

        const endpoint = `${location.origin}/movie/patch/${movieId}`
        const reqObj = {
            method: 'PATCH',
            body: JSON.stringify(reqBody),
            headers: {
             'Access-Control-Allow-Origin': '*',
             Accept: 'Application/json',
             'content-type': 'application/json'
            }
            

        };

        fetch(endpoint, reqObj)
            .then(rs => {return rs.json()})
            .then(res => {console.log(res)})
            .catch( err => {console.log(err) });

         //check if successful
             //if succesful switch back to original screen
             //if not successful alert user of error with message

     
}

function reqSingleMovieData() {
    const movieId = this.parentElement.id;

    const endpoint = `${location.origin}/movie/${movieId}`;

    fetch(endpoint)
    .then(rs => {return rs.json()})
    .then(res => {
        console.log(res)
    })

    // const xhr = new XMLHttpRequest();

    // xhr.open('GET', endpoint, true);
    // xhr.onload = () => {
    //     const res = parse(xhr.responseText);

    //     console.log(res)
    // }
    // xhr.send
}

function deleteSingleMovie() {

    let confirm = prompt('Type "confirm" to delete document');

    if (confirm != 'confirm') {
        
        return alert('Document deletion canceled')

    }


    const movieId = this.parentElement.parentElement.id;

    const endpoint = `${location.origin}/movie/delete/${movieId}`;

    reqObj = {
         method: 'DELETE'
    };

    fetch(endpoint, reqObj)
    .then(rs => {
    
    if (rs.status === 200) { //doc DB deletion success, delete element from FE.

        this.parentElement.parentElement.remove();

        } 
    
        }    
    )
}

function changeEditView() {

    const movieDivChildren = this.parentElement.parentElement.childNodes;

    movieDivChildren.forEach( node => {

        if (node.className === 'displayMovie'  ||  node.className === 'editMovie') {

            node.style.dispay = node.style.display == 'none' ? 'flex' : 'none';
        

        }

    })
}







