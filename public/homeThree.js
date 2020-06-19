
function clickedBtn(){
    console.log('button clicked')
}

window.onload = () => {


    //clickMe.onclick = clickedBtn;

    const getButtons = document.getElementsByClassName('getMovie');

    for (const button of getButtons) {
        button.onclick = reqSingleMovieData
    };

    const deleteButton = document.getElementsByClassName('deleteMovie');

    for (const btn of deleteButton) {
        btn.onclick = deleteSingleMovie
    };

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


    const movieId = this.parentElement.id;

    const endpoint = `${location.origin}/movie/delete/${movieId}`;

    reqObj = {
        method: 'DELETE'
    };

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(res => {
        console.log(res)
    })



}