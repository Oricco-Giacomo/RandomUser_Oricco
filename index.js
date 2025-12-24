"use strict";

let people = [];
let people_ix = -1;

let button = document.querySelector("button")
let slider = document.getElementById("PeopleSlider");
let radiosGenre = document.getElementsByName("chkGenere");
let nats = document.getElementsByClassName("chkNation");
let lblCorr = document.getElementById("lblCorr");
let lblTot = document.getElementById("lblTot");
let btnIndietro = document.getElementById("btnIndietro");
let btnAvanti = document.getElementById("btnAvanti");
button.addEventListener("click", loadUsers)

function loadUsers(){

    let gender = checkRadios();
    let natlist = [];
    natlist = getnats();
    natlist = natlist.join(",");


    let params = {
        results: slider.value,
        gender: gender,
        nat: natlist,
    }
                                // metodo, risorsa, parametri
    let promise = ajax.sendRequest("GET", "/api", params)
    promise.catch(ajax.errore)
    promise.then(function(httpResponse){
       people = httpResponse.data.results;
       if(people) {
            console.log(people);
            people_ix = 0;
            lblTot.innerHTML = people.length;
            btnIndietro.removeAttribute("disabled");
            btnAvanti.removeAttribute("disabled");
            loadPerson(people_ix);
       } else {
            alert("Ci è stato un errore.");
       }
    })
}

function loadPerson(index) {
    // Qua carico tutte le info della persona
    const person = people[index];
    if(!person) {
        alert("Elenco finito!");
        return;
    }

    lblCorr.innerHTML = people_ix+1;
}

function checkRadios()
{
    for(let i = 0;i<radiosGenre.length;i++)
    {
        if(radiosGenre[i].checked)
        {
            return radiosGenre[i].value;
        }
    }
}

function getnats()
{
    let temp = [];
    for(let i = 0;i<nats.length;i++)
    {
        if(nats[i].checked)
        {
            temp.push(nats[i].value.toLowerCase());
        }
    }
    return temp;
}