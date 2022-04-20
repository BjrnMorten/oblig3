'use strict';

const billettRegister=[];

class Ticket {
    constructor(film, antall, fornavn, etternavn, telefonnr, epost) {
        this._film = film;
        this._antall = antall;
        this._fornavn = fornavn;
        this._etternavn = etternavn;
        this._telefonnr = telefonnr;
        this._epost = epost;

        this._btnDelete = document.createElement("input");
        this._btnDelete.setAttribute("type", "button");
        this._btnDelete.setAttribute("value", "Slett");
        this._btnDelete.addEventListener("click", (e) => {
            this.remove();
        });
        
        const td = document.createElement("td");
        td.appendChild(this._btnDelete);

        this._element = document.createElement("tr");
        this._element.innerHTML = `<td>${this._film}</td>
            <td>${this._antall}</td>
            <td>${this._fornavn}</td>
            <td>${this._etternavn}</td>
            <td>${this._telefonnr}</td>
            <td>${this._epost}</td>`;
        this._element.appendChild(td);
    }

    remove() {
        const parent = this._element.parentElement;
        if (parent) {
            parent.removeChild(this._element);
        }
    }

    get element() {
        return this._element;
    }
}

function addTicket(ticket) {
    const tableResults = document.getElementById("table-results");
    if (tableResults) {
        tableResults.appendChild(ticket.element);
    }
}

function kjop() {

    if (isNotEmpty(document.getElementById("epost"))) {

        const film = document.getElementById("film").selectedOptions[0].text;
        const antall = parseFloat(document.getElementById("antall").value);
        const fornavn = document.getElementById("fornavn").value;
        const etternavn = document.getElementById("etternavn").value;
        const telefonnr = document.getElementById("telefonnr").value;
        const epost = document.getElementById("epost").value;


        const ticket = new Ticket(film, antall, fornavn, etternavn, telefonnr, epost);
        billettRegister.push(ticket);
        postData('http://localhost:8080/tickets', { "film": film, "antall": antall, "fornavn": fornavn, "etternavn": etternavn, "telefonnr": telefonnr, "epost": epost })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
        addTicket(ticket);

        //nullstill inputboksene
        document.getElementById("film").selectedIndex = 0;
        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("telefonnr").value = "";
        document.getElementById("epost").value = "";
    }
}

// postData copied from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function deleteData(url = '') {
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}

function isNotEmpty(field) {

    var fieldData = field.value;

    if (fieldData.length === 0 || fieldData == "") {

        field.className = "FieldError"; //Classs to highlight error
        alert("Fyll alle inputene.");
        return false;
    } else {

        field.className = "FieldOk"; //Resets field back to default
        return true; //Submits form
    }
}

function slett(){
    billettRegister.forEach((ticket) => {
        ticket.remove();
    });
    deleteData('http://localhost:8080/tickets')
        .then(data => {
            console.log(data);
        });
}