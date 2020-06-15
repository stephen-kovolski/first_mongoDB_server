//post a new movie
const fs = require('fs');
const home = require('./home');

window.onload = () => {

let pageTitleDiv = createDivElement({id: 'pageTitleDiv'})
        document.body.appendChild(pageTitleDiv)

    let siteTitle = createHeading({text: 'Welcome to the movie rental site', size: 1});
        titleDiv.appendChild(siteTitle)

    let userInputDiv = createDivElement({id: 'userInputDiv'});
        document.body.appendChild(userInputDiv);

    let buttonDiv = createDivElement({id: 'buttonDiv'})
        document.body.appendChild(buttonDiv)


    

        

    const xhr = new XMLHttpRequest();
    
    const endpoint = `${location}movie/all`;

    

    xhr.open('POST',  endpoint, true);
    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText)

        console.log(response)

        displayMovies(response.movies);

    }
    xhr.send();

    //location = 'movie/all'    <-- this will redirect the user to a new route



}