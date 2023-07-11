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
var films;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${ENDPOINT}findTop5ByOrderByReleaseDateDesc`)
            .then((res) => res.json())
            .then((json) => {
            films = json;
            loadImages();
        });
    });
}
init();
function loadImages() {
    var images = document.querySelectorAll(".slide-image");
    console.log(images);
    let i = 0;
    images.forEach(element => {
        if (i == 5)
            i = 0;
        console.log(i);
        element.setAttribute("src", films[i].image);
        console.log(films[i].image);
        i = i + 1;
    });
}
export {};
