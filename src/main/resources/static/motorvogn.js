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
})

btn.addEventListener("click", () => {
    const lagMotorvogn = Motorvogn(personnr.value, navn.value, addresse.value,
                                        kjennetegn.value, bilmerke.value, biltype.value);
    const nyMotorvogn = lagMotorvogn();
    $.post("registrer",nyMotorvogn, function (motorvogner) {
        console.log(motorvogner)
        if(motorvogner) {
            visMotorvognListe(motorvogner)
        }
        for(let inp of inputs) {
            inp.value =""
        }
    })
})

slettAlle.addEventListener("click", () => {
    $.get("slettAlle", (data) => {
        tabel.innerHTML = "";
        visMotorvognListe(data)
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
    newNode.innerHTML = str;
    return newNode;
}
