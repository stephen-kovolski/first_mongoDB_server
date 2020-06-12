//requst the api

window.onload = () => {

    AvailMoviesDiv = createDivElement({id: 'AvailMoviesDiv'});
    document.body.appendChild(AvailMoviesDiv);


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

    let siteTitle = createHeading({text: 'Welcome to the movie rental site', size: 5});
    AvailMoviesDiv.appendChild(siteTitle)


    for (let i = 0; i < allMovies.length; i++) {

        const movieData = allMovies[i];
        const title = document.createElement('h1')
        const release = document.createElement('h3')
        const movieImg = document.createElement('img')
        const imdbLink = createHyperLink({openNewTab: true, hreflink: movieData.imdb, text: movieData.title  + ' ' + 'Imdbpage', class: 'imdblink'})

        title.innerText = movieData.title;
        release.innerText = movieData.release;
        movieImg.src = movieData.img;
        movieImg.alt = movieData.title + 'IMG';

        AvailMoviesDiv.appendChild(title)
        AvailMoviesDiv.appendChild(release)
        AvailMoviesDiv.appendChild(movieImg)
    
        AvailMoviesDiv.appendChild(imdbLink)




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