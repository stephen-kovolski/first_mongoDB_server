//requst the api

window.onload = () => {

    let titleDiv = createDivElement({id: 'titleDiv'})
        document.body.appendChild(titleDiv)

    let siteTitle = createHeading({text: 'Welcome to the movie rental site', size: 1});
        titleDiv.appendChild(siteTitle)

    let availMoviesDiv = createDivElement({id: 'availMoviesDiv'});
        document.body.appendChild(availMoviesDiv);

    let rentedMovies = createDivElement({id: 'rentedMovies'})
        document.body.appendChild(rentedMovies)

    let postMovieDiv = createDivElement({id: 'postMovieDiv'})
        document.body.appendChild(postMovieDiv);

    const postButton = document.createElement('button');    
            postButton.id = 'postButton';
            postButton.onclick = postMovie;

            postButton.innerText = 'Add A New Movie'
            titleDiv.appendChild(postButton)

    

        

    const xhr = new XMLHttpRequest();
    
    const endpoint = `${location}movie/all`;

    

    xhr.open('GET',  endpoint, true);
    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText)

        console.log(response)

        displayMovies(response.movies);

    }
    xhr.send();

    //location = 'movie/all'    <-- this will redirect the user to a new route

}

function displayMovies(allMovies) {


    for (let i = 0; i < allMovies.length; i++) {

        const singleMovieDiv = createDivElement({})
        let imdbDiv = createDivElement({});


        const movieData = allMovies[i];
        const title = document.createElement('h1')
        const release = document.createElement('h3')
        const movieImg = document.createElement('img')
        const imdbLink = createHyperLink({openNewTab: true, hreflink: movieData.imdb, text: movieData.title  + ' ' + 'Imdbpage', class: 'imdblink'})
        const rentButton = document.createElement('button');
        const returnButton = document.createElement('button');


        rentButton.id = 'rentButton';
        rentButton.oncick = rentMovie;
        returnButton.id = "returnMovie";
        returnButton.onclick = returnMovie;


        title.innerText = movieData.title;
        release.innerText = movieData.release;
        movieImg.src = movieData.img;
        movieImg.alt = movieData.title + 'IMG';
        rentButton.innerText = `Rent ${movieData.title}`;
        returnButton.innerText = `Return ${movieData.title}`;


        availMoviesDiv.appendChild(singleMovieDiv)


        singleMovieDiv.appendChild(title)
        singleMovieDiv.appendChild(release)
        singleMovieDiv.appendChild(movieImg)

        singleMovieDiv.appendChild(imdbDiv)

        singleMovieDiv.appendChild(rentButton)
        singleMovieDiv.appendChild(returnButton)

        imdbDiv.appendChild(imdbLink)


        //for (let i = 0; i < allMovies.length)


    }

}

function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id
        
    }

    return heading
    
}

function createDivElement(divObject) {

    //class and id

    const div = document.createElement('div');

    if (divObject.id != undefined && document.getElementById(divObject.id) == null) {

        div.id = divObject.id; 
        
    }

    if (divObject.class != undefined ) {

        div.className = divObject.class;
        
    }

    // console.log(div);

    return div
    
}

function createHyperLink(linkObject) {

    //class and id

    const link = document.createElement('a');


    //set my Id in the case that I define that property in my linkObject
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null) {

        link.id = linkObject.id; 
        
    }

    //set my Id in the case that I define that property in my linkObject
    if (linkObject.class != undefined ) {

        link.className = linkObject.class;

    }

    //property name openNewTab

    if ( linkObject.openNewTab === true ) {

        link.target = '_blank';
        
    }

    link.innerText = linkObject.text != undefined ? linkObject.text : 'Untitled Link';

    link.href = linkObject.hrefLink != undefined ? linkObject.hrefLink : 'No Link';

    // console.log(link);

    return link
    
}

function createInput(inputObj) { // id, class, sCheck, pHolder

    let input = document.createElement(`input`);

    input.id = inputObj.id != undefined && document.getElementById(inputObj.id) == null ? inputObj.id : `>> No ID <<`;

    input.placeholder = inputObj.placeholder != undefined ? inputObj.placeholder : ``;

    return input

}

function rentMovie() {
}

function returnMovie() {
}

function postMovie() {

    document.getElementById('postMovieDiv').style.display = 'visible'; 
    document.getElementById('availMoviesDiv').style.display = "none"; 

    let postPageTitle = createHeading({text: 'Thank you for contributing!  Please fill out the information below', size: 1});
        postMovieDiv.appendChild(postPageTitle)


    let postFormDiv = createDivElement({id: 'postFormDiv'})
        postMovieDiv.appendChild(postFormDiv)


    let movieTitle = createInput('input');
        movieTitle.id = 'movieTitle'
        movieTitle.placeholder = 'Movie Name';

    let availability = createInput('input');
        availability.id = 'availability'
        availability.placeholder = 'availability';


    let releaseDate = createInput('input');
        releaseDate.id = 'releaseDate'
        releaseDate.placeholder = 'Release Date';


    let imdbInput = createInput('input');
        imdbInput.id = 'imdbInput'
        imdbInput.placeholder = 'imdb link';


    let movieImg = createInput('input');
        movieImg.id = 'movieImg'
        movieImg.placeholder = 'Movie Image';



    let submitButton = document.createElement('button');
        submitButton.id = 'submitButton';
        submitButton.onclick = submitNewMovie;
        submitButton.innerText = 'Submit';



        postMovieDiv.appendChild(movieTitle)
        postMovieDiv.appendChild(availability)
        postMovieDiv.appendChild(releaseDate)
        postMovieDiv.appendChild(imdbInput)
        postMovieDiv.appendChild(movieImg)
        postMovieDiv.appendChild(submitButton)


}

function submitNewMovie() {

}

