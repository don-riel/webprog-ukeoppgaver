const btn = document.getElementById("register");
const slettAlle = document.getElementById("slett")
const personnr = document.getElementById("innPersonnr");
const navn = document.getElementById("innNavn");
const addresse = document.getElementById("innAddresse");
const kjennetegn = document.getElementById("innKjennetegn");
const tabel = document.getElementById("tabel");
const inputs = [personnr, navn, addresse, kjennetegn ];
const merkeOption = document.getElementById("merke");
const typeOption = document.getElementById("type");
const errSpans = document.querySelectorAll(".errSpan");
const reg_motorvogn = document.getElementById("reg_motorvogn");
const reg_bruker = document.getElementById("reg_bruker");
const regBrukerBtn = document.getElementById("register_bruker");
const loggInnBtn = document.getElementById("loggeinn");
const loggUtBtn = document.getElementById("loggut");
const brukernavnInput = document.getElementById("brukernavn");
const passordInput = document.getElementById("passord");

let postState = "Register";
let loggetinn = false;

function Motorvogn(innPersonnr, innNavn, innAddresse,
                   innKjennetegn, innBilmerke, innBiltype) {
    let personnr, navn, addresse, kjennetegn, bilmerke, biltype;

    return function () {
        personnr = innPersonnr;
        navn = innNavn;
        addresse = innAddresse;
        kjennetegn = innKjennetegn;
        bilmerke = innBilmerke;
        biltype = innBiltype;

        return {
            personnr,
            navn,
            addresse,
            kjennetegn,
            bilmerke,
            biltype
        }
    }
}

$(function() {
    initRegisterVognBtn();
    initRegBrukerBtn();
    initLoggInnBtn();
    initLoggUtBtn();
    hentAlle();
    updateGui();

    //Merke options. Type oppdaters etter valgt merke
    merkeOption.addEventListener("change", (e) => {
        console.log(typeof e.value)
        populateTypeOptions(e.target.value)
        console.log("change")
    });
    const valgtMerke = merkeOption.value;
    populateTypeOptions(valgtMerke);
})

function updateGui() {
    toggleMotorvogReg();
    toggleBrukerREg();
    hentAlle();
}

function toggleLoggetInn() {
    loggetinn = !loggetinn
}

function toggleMotorvogReg() {
    reg_motorvogn.style.display = loggetinn ? 'block' : 'none';
}

function toggleBrukerREg() {
    reg_bruker.style.display = loggetinn ? 'none' : 'block';
}

function populateTypeOptions(merke) {
    switch (merke) {
        case "Volvo":
            renderType(["V30", "V70", "V90"])
            break;
        case "Audi":
            renderType(["A3", "A5", "A7"])
            break;
        case "Bmw":
            renderType(["M1", "M3", "M5"])
            break;
        default:
            break;
    }
}

function renderType(typer) {
    typeOption.innerHTML = "";
    for(let type of typer) {
        let newType = document.createElement("option");
        newType.setAttribute("value", type);
        newType.text = type;
        typeOption.appendChild(newType)
    }

}
function initRegisterVognBtn () {
    btn.addEventListener("click", () => {
        emptyErrorSpans();
        let invalidInputs = validerInputs(inputs);
        if (invalidInputs.length) {
            showInvalidInputErrors(invalidInputs);
        } else {
            const lagMotorvogn = Motorvogn(personnr.value, navn.value, addresse.value,
                kjennetegn.value, merkeOption.value, typeOption.value);
            const nyMotorvogn = lagMotorvogn();
            if(postState === "Register") {
                $.post("registrer",nyMotorvogn, function (data) {
                    if(data) {
                        hentAlle();
                    }
                    else {
                        alert("Ikke logget inn");
                    }
                    for(let inp of inputs) {
                        inp.value =""
                    }
                })
            } else {
                $.post("endreVogn", nyMotorvogn, (data) => {
                    if(data) {
                        hentAlle();
                        postState = "Register";
                        btn.innerText = postState;
                    }
                    else {
                        alert("Ikke logget inn");
                    }
                    for(let inp of inputs) {
                        inp.value =""
                    }
                })

            }
        }
    })
}

function initRegBrukerBtn () {
    regBrukerBtn.addEventListener("click", () => {
        let brukernavn;
        let passord;
        if (brukernavnInput.value && passordInput.value) {
            brukernavn = brukernavnInput.value;
            passord = passordInput.value;

            $.post("registrerUser", {brukernavn,passord}, (data) => {
                if (data) {
                    toggleLoggetInn();
                    updateGui();
                }
            })
        }
        else {
            alert("Ma fylle brukernavn og passord")
        }
    })
}

function initLoggInnBtn() {
    loggInnBtn.addEventListener("click", () => {
        let brukernavn;
        let passord;
        if (brukernavnInput.value && passordInput.value) {
            brukernavn = brukernavnInput.value;
            passord = passordInput.value;

            $.get("loggeInn", {brukernavn,passord}, (data) => {
                if (data) {
                    toggleLoggetInn();
                    updateGui();
                }
                else {
                    alert("Bruker ikke funnet!")
                }
            })
        }
        else {
            alert("Ma fylle brukernavn og passord")
        }
    })
}

function initLoggUtBtn() {
    loggUtBtn.addEventListener("click", () => {
        $.get("loggUt", (data) => {
            if (data) {
                toggleLoggetInn();
                updateGui();
            }
            else {
                alert("Something went wrong")
            }
        })
    })
}

let charLengthLimit = {
    personnummer: 11,
    navn: 30,
    addresse: 60,
    kjennetegn: 7
}
function showInvalidInputErrors(invalidInputs) {
    let errSpan = "";
   for (let invalidInput of invalidInputs) {
       let selector = "#err" + invalidInput.name;
       errSpan = document.querySelector(selector);
       errSpan.innerHTML = invalidInput.name + " må bestå av 2 til " + charLengthLimit[invalidInput.name.toLowerCase()] + " bokstaver!"
   }
}

function emptyErrorSpans () {
    for(let span of errSpans) {
        span.innerHTML = "";
    }
}

slettAlle.addEventListener("click", () => {
    $.get("slettAlle", (data) => {
        if(data) {
            tabel.innerHTML = "";
            visMotorvognListe(data)
        } else {
            alert("Ikke logget inn");
        }
    })
})

function hentAlle () {
    $.get("hentAlle", (data) => {
        visMotorvognListe(data)
    })
}

function visMotorvognListe(liste) {
    tabel.innerHTML = "";
    if(liste.length) {
        visTableTitler();
        for (let vogn of liste) {
            tabel.appendChild(formaterMotorvognString(vogn, loggetinn))
        }
    }
}

function visTableTitler() {
    let titler = "";
    titler += "<tr>" +
        "<th>Personnr</th><th>Navn</th><th>Addresse</th><th>Kjennetegn</th><th>Bilmerke</th><th>Biltype</th>" +
        "</tr>";
    tabel.innerHTML = titler;
}

function formaterMotorvognString (motorvogn) {
    let newNode = document.createElement("tr");
    let str = "";
    str +=
        "<th>" + motorvogn.personnr + "</th><th>" +motorvogn.navn + "</th><th>"
        + motorvogn.addresse + "</th><th>" + motorvogn.kjennetegn + "</th><th>" +
        motorvogn.bilmerke + "</th><th>" + motorvogn.biltype + "</th>";

        let endreBtn = document.createElement("button");
        endreBtn.textContent = "Endre";
        endreBtn.classList.add("btn", "btn-primary")
        endreBtn.addEventListener("click", () => {
            if (loggetinn) {
                getEndreInfo(motorvogn)
            }
            else {
                alert("Ikke logget inn");
            }
        })
        let slettBtn = document.createElement("button");
        slettBtn.textContent = "Slett";
        slettBtn.classList.add("btn", "btn-danger")
        slettBtn.addEventListener("click", () => {
            $.post("slettEtVogn", motorvogn, (data) => {
                if (!data) {
                    alert("Ikke logget inn");
                }
                hentAlle();
            })
        })
        newNode.innerHTML = str;
        newNode.appendChild(endreBtn)
        newNode.appendChild(slettBtn)

    return newNode;
}

function getEndreInfo(motorvogn) {
    postState = "Endre";
    btn.innerText = postState;
    personnr.value = motorvogn.personnr;
    navn.value = motorvogn.navn;
    addresse.value = motorvogn.addresse;
    kjennetegn.value = motorvogn.kjennetegn;
    merkeOption.value = motorvogn.bilmerke;
    populateTypeOptions(merkeOption.value);
    typeOption.value = motorvogn.biltype;
}
