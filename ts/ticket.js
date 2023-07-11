var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ENDPOINT = "http://localhost:8080/api/v1/";
var filmScreenings;
var uniqueFilmTitles = [];
var filmTime = [];
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${ENDPOINT}findAllByIsBookableTrue`)
            .then((res) => res.json())
            .then((json) => {
            filmScreenings = json;
            console.log(filmScreenings);
            initFilmSelection();
            initTimeSelection();
        });
    });
}
init();
document.querySelector(".selectFilm").addEventListener('change', function () {
    initTimeSelection();
});
function initFilmSelection() {
    uniqueFilmTitlesFilter();
    var select = document.querySelector(".selectFilm");
    for (var i = 0; i < uniqueFilmTitles.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", uniqueFilmTitles[i]);
        option.appendChild(document.createTextNode(uniqueFilmTitles[i]));
        select === null || select === void 0 ? void 0 : select.appendChild(option);
    }
}
function uniqueFilmTitlesFilter() {
    filmScreenings.forEach(fs => {
        if (uniqueFilmTitles.indexOf(fs.title) == -1)
            uniqueFilmTitles.push(fs.title);
    });
}
function getTimeBySelected() {
    filmTime = [];
    var title = document.querySelector(".selectFilm").value;
    filmScreenings.forEach(fs => {
        if (fs.title == title) {
            filmTime.push(fs.time);
        }
    });
}
function initTimeSelection() {
    getTimeBySelected();
    var select = document.querySelector(".selectTime");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    for (var i = 0; i < filmTime.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", filmTime[i].toLocaleString());
        option.appendChild(document.createTextNode(new Date(filmTime[i].toString()).toLocaleString()));
        select === null || select === void 0 ? void 0 : select.appendChild(option);
    }
}
document.querySelector('form').addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // Evita l'invio del form
        const formElement = event.target;
        const formData = new FormData(formElement);
        var filmToSearch = formData.get('film');
        var timeToSearch = formData.get('time');
        var screeningIdToInsert = -1;
        console.log(formData.get('time'));
        filmScreenings.forEach(fs => {
            if (fs.title == filmToSearch && fs.time.toString() == timeToSearch)
                screeningIdToInsert = parseInt(fs.screeningId);
        });
        var booking = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            numTickets: parseInt(formData.get('number'), 10),
            screeningId: screeningIdToInsert
        };
        const requestOptions = {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json"
            }
        };
        yield fetch(`${ENDPOINT}saveBooking`, requestOptions)
            .then(response => response.json())
            .then(data => {
            console.log(data);
        })
            .catch(error => {
            // Gestisci gli errori
        });
    });
}
export {};
