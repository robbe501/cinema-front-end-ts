const ENDPOINT: string = "http://localhost:8080/api/v1/";
import { FilmScreening } from 'interfaces/film.screening.interface'
import { Booking } from 'interfaces/booking.interface'

var filmScreenings: FilmScreening[];

var uniqueFilmTitles: string[] = [];

var filmTime: Date[] = [];


async function init() {
    await fetch(`${ENDPOINT}findAllByIsBookableTrue`)
        .then((res) => res.json())
        .then((json) => { 
            filmScreenings = json;
            console.log(filmScreenings)
            initFilmSelection()
            initTimeSelection()
        })
}

init() 

document.querySelector(".selectFilm")!.addEventListener('change', function(){
    initTimeSelection()
});

function initFilmSelection() {
    uniqueFilmTitlesFilter() 
    var select = document.querySelector(".selectFilm");
    for(var i = 0; i < uniqueFilmTitles.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", uniqueFilmTitles[i]);
        option.appendChild(document.createTextNode(uniqueFilmTitles[i]));
        select?.appendChild(option);
    }

}


function uniqueFilmTitlesFilter() {
    filmScreenings.forEach(fs => {
        if(uniqueFilmTitles.indexOf(fs.title) == -1)
            uniqueFilmTitles.push(fs.title);
    });
}

function getTimeBySelected() {
    filmTime = []
    var title = (<HTMLSelectElement>document.querySelector(".selectFilm")!).value;
    filmScreenings.forEach(fs => {
        if(fs.title == title){
            filmTime.push(fs.time);
        }
    });

}

function initTimeSelection() {
    getTimeBySelected()
    
    var select = document.querySelector(".selectTime");

    while (select!.firstChild) {
        select!.removeChild(select!.firstChild);
    }

    for(var i = 0; i < filmTime.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", filmTime[i].toLocaleString());
        option.appendChild(document.createTextNode(new Date(filmTime[i].toString()).toLocaleString()));
        select?.appendChild(option);
    }
}


document.querySelector('form')!.addEventListener('submit', handleSubmit);

async function handleSubmit(event: Event) {
  event.preventDefault(); // Evita l'invio del form

  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);

  var filmToSearch = formData.get('film') as string;
  var timeToSearch = formData.get('time') as string;
  var screeningIdToInsert: number = -1;
  console.log(formData.get('time'))
  filmScreenings.forEach(fs => {
    if(fs.title == filmToSearch && fs.time.toString() == timeToSearch)
        screeningIdToInsert = parseInt(fs.screeningId);   
  });

  var booking: Booking = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    numTickets: parseInt(formData.get('number') as string, 10),
    screeningId: screeningIdToInsert

  }
  const requestOptions: RequestInit = {
    method: 'POST',
    mode: "cors",
    body: JSON.stringify(booking),
    headers: {
        "Content-Type": "application/json"
    }
  };

    await fetch(`${ENDPOINT}saveBooking`, requestOptions)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        })
        .catch(error => {
        // Gestisci gli errori
        }); 
}