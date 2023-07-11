const ENDPOINT: string = "http://localhost:8080/api/v1/";
import { Film } from 'interfaces/film.interface'

var films: Film[];

async function init() {
    await fetch(`${ENDPOINT}findTop5ByOrderByReleaseDateDesc`)
        .then((res) => res.json())
        .then((json) => { 
            films = json;
            loadImages()
        });


}

init()


function loadImages() {
    var images = document.querySelectorAll(".slide-image");
    console.log(images)
    let i = 0;
    images.forEach(element  => {
        if(i == 5)
            i = 0;
        console.log(i)
        element.setAttribute("src", films[i].image);
        console.log(films[i].image)
        i =  i + 1;
        
    });
}
