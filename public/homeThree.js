console.log('GFY')

function clickedBtn(){
    console.log('button clicked')
}

window.onload = () => {
    clickedBtn.onclick = clickedBtn;

    const getButtons = document.getElementsByClassName('getMovie');

    for (const button of getButtons) {button.onclick = reqSingleMovieData};
}

function reqSingleMovieData() {
    const movieId = this.parentElement.id;

    const endpoint = 'http;//localhost:5000/movie/get/:id'

    const xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint, true);
    xhr.onload = () => {
        const res = parse(xhr.responseText);

        console.log(res)
    }
    xhr.send
}