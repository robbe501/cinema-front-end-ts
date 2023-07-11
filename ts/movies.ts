const ENDPOINT: string = "http://localhost:8080/api/v1/";
import { Film } from 'interfaces/film.interface'
import { Actor } from 'interfaces/actor.interface'

var films: Film[];
var actors: Actor[];

// Pagina corrente e numero di record visualizzati per pagina
var page: number = 0;
const filmsPerPage: number = 3; 

async function init() {
    await fetch(`${ENDPOINT}findAllFilms`)
        .then((res) => res.json())
        .then((json) => { 
            films = json;
            loadImages();
        })
        .then(() => {
            movePages();
        });


}

init()

function loadImages() {
    document.querySelector(".page")!.innerHTML = (page + 1).toString();
    var main = document.querySelector(".main-container");

    // Elimino tutto il contenuto del main
    while (main!.firstChild) {
        main!.removeChild(main!.firstChild);
    }

    for (let i = filmsPerPage * page  ; i <  (filmsPerPage * page) + filmsPerPage ; i++) {
        main?.insertAdjacentHTML('beforeend', `
        <div class="container dynamic-film" data-toggle="modal" data-target="#exampleModal">   
            <div class="d-flex align-items-center py-4 ">
                <div class="">
                    <img width="150" height="auto" class="containerbg" src="${films[i].image}" alt="">
                </div>
                <div class="mr-5 desc">
                    <span class="title">Title: ${films[i].title}</span><br>
                    <span class="length">Length: ${films[i].length}</span><br>
                    <span class="rating">Rating: ${films[i].rating}/5</span><br>
                </div>
            </div>
        </div>
        `);
        main?.lastElementChild!.addEventListener('click', function(){
            editModal(films[i]);
        });
    }


}

async function editModal(film: Film) {
    await fetch(`${ENDPOINT}findActorsByFilmId/${film.filmId}`)
        .then((res) => res.json())
        .then((actors: Actor[]) => { 
            document.querySelector(".modal-title")!.innerHTML = film.title;
            document.querySelector(".modal-body")!.innerHTML = film.plot;
            document.querySelector(".modal-body")!.appendChild(document.createElement('br'))
            document.querySelector(".modal-body")!.appendChild(document.createTextNode("Actors:"))
            console.log(actors)
            actors.forEach(actor => {
                document.querySelector(".modal-body")!.appendChild(document.createElement('br'))
                document.querySelector(".modal-body")!.appendChild(document.createTextNode(actor.firstName + " " + actor.lastName))
            });
        });
}



// Funzione che permette di cambiare pagina
function movePages() {
    // Prendo tramite querySelector il pulsante '<' e aggiungo l'EventListener
    document.querySelector(".left-arrow")!.addEventListener('click', function(){
        // Controllo di non essere alla zeresima pagina
        if(page > 0) {
            // Diminuisco la pagina di uno e ricarico le righe
            page--;
            loadImages();
        }
    });

    // Prendo tramite querySelector il pulsante '>' e aggiungo l'EventListener
    document.querySelector(".right-arrow")!.addEventListener('click', function(){
        // Controllo che ci siano ancora record disponibili da stampare
        if(films.length - (page + 1) * filmsPerPage >= 0) {   
            // Incremento la pagina di uno e ricarico le righe     
            page++;
            loadImages();
        }
    }); 
}