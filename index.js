"use strict";
	
let tbody = document.querySelector("tbody")
let button = document.querySelector("button")
button.addEventListener("click", fillTable)

function fillTable(){
    let params = {
        results:20,
        gender:"male"
    }
                                // metodo, risorsa, parametri
    let promise = ajax.sendRequest("GET", "/api", params)
    promise.catch(ajax.errore)
    promise.then(function(httpResponse){
       console.log(httpResponse)
       let people = httpResponse.data;
       tbody.innerHTML=""
       for (let person of people.results){
           let tr = document.createElement("tr") 
           tbody.appendChild(tr)

           let td = document.createElement("td") 
           td.textContent = person.name.first +  " " + person.name.last
           tr.appendChild(td)
       }

    })
}


