const btn = document.getElementById("register");
const slettAlle = document.getElementById("slett")
const personnr = document.getElementById("innPersonnr");
const navn = document.getElementById("innNavn");
const addresse = document.getElementById("innAddresse");
const kjennetegn = document.getElementById("innKjennetegn");
const bilmerke = document.getElementById("innBilmerke");
const biltype = document.getElementById("innBiltype");
const tabel = document.getElementById("tabel");
const inputs = [personnr, navn, addresse, kjennetegn, bilmerke, biltype];
const merkeOption = document.getElementById("merke");
const typeOption = document.getElementById("type");

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
  hentAlle();

    merkeOption.addEventListener("change", (e) => {
        console.log(typeof e.value)
        populateTypeOptions(e.target.value)
        console.log("change")
    });
    const valgtMerke = merkeOption.value;
    populateTypeOptions(valgtMerke);
})


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
    console.log(typer)
    typeOption.innerHTML = "";
    for(let type of typer) {
        let newType = document.createElement("option");
        newType.setAttribute("value", type);
        newType.text = type;
        typeOption.appendChild(newType)
    }

}
btn.addEventListener("click", () => {
    const lagMotorvogn = Motorvogn(personnr.value, navn.value, addresse.value,
                                        kjennetegn.value, merkeOption.value, typeOption.value);
    const nyMotorvogn = lagMotorvogn();
    $.post("registrer",nyMotorvogn, function (data) {
        if(data) {
            hentAlle();
        }
        for(let inp of inputs) {
            inp.value =""
        }
    })
})

slettAlle.addEventListener("click", () => {
    $.get("slettAlle", (data) => {
        tabel.innerHTML = "";
        if(data) {
            visMotorvognListe(data)
        } else {
            alert("Noe gikk galt!")
        }
    })
})

function hentAlle () {
    $.get("hentAlle", (data) => {
        console.log(data)
        visMotorvognListe(data)
    })
}

function visMotorvognListe(liste) {
    tabel.innerHTML = "";
    if(liste.length) {
        visTableTitler();
        for (let vogn of liste) {
            tabel.appendChild(formaterMotorvognString(vogn))
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
       $.post("endreVogn", motorvogn, (data) => {
           console.log(data)
       })
    })
    let slettBtn = document.createElement("button");
    slettBtn.textContent = "Slett";
    slettBtn.classList.add("btn", "btn-danger")
    slettBtn.addEventListener("click", () => {
        $.post("slettEtVogn", motorvogn, (data) => {
            hentAlle();
        })
    })
    newNode.innerHTML = str;
    newNode.appendChild(endreBtn)
    newNode.appendChild(slettBtn)
    return newNode;
}