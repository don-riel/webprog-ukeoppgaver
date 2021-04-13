const btn = document.getElementById("register");
const slettAlle = document.getElementById("slett")
const personnr = document.getElementById("innPersonnr");
const navn = document.getElementById("innNavn");
const addresse = document.getElementById("innAddresse");
const kjennetegn = document.getElementById("innKjennetegn");
const bilmerke = document.getElementById("innBilmerke");
const biltype = document.getElementById("innBiltype");

btn.addEventListener("click", () => {
    const lagMotorvogn = Motorvogn(personnr.value, navn.value, addresse.value,
                                        kjennetegn.value, bilmerke.value, biltype.value);
    const nyMotorvogn = lagMotorvogn();
    $.post("registrer",nyMotorvogn, function (motorvogner) {
        if(motorvogner) {
            for(let motorvogn of motorvogner) {
                console.log(motorvogn)
            }
        }
    })
})

slettAlle.addEventListener("click", () => {
    $.get("slettAlle", (data) => {
        if (data.length > 0) {
            console.log(data)
        } else {
            console.log("listen er tom")
        }
    })
})

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