const liste = document.getElementById('liste')

const oppgaver = []

const oppgave1 = {
    sporsmol: "Når er frist for oblig 1?",
    alternativer: ['1. Februar', '6. Februar', '12. Februar'],
    riktigIndex: 2
}

const oppgave2 = {
    sporsmol: "Hvor mange obliger er det i dette faget?",
    alternativer: ['3', '5', 'ingen', '2'],
    riktigIndex: 0
}

const oppgave3 = {
    sporsmol: "Hva står API for?",
    alternativer: ['App Program Instruction', 'Application Programming Interface', 'Det er ikke en forkortelse'],
    riktigIndex: 1
}

oppgaver.push(oppgave1)
oppgaver.push(oppgave2)
oppgaver.push(oppgave3)

let answers = [];

function createOppggave(choices) {
    for(let i = 0; i < choices.length; i++) {
        const quest = document.createElement('li');
        quest.innerText = choices[i].sporsmol;
        liste.appendChild(quest);

        let alternativer = choices[i].alternativer;
        const altList = document.createElement('ul');

        for (let j = 0; j < alternativer.length; j++) {
            const alt = document.createElement('input');
            const label = document.createElement('label');

            alt.id = j.toString();
            alt.type = 'radio';
            alt.name = 'oppgave-' + (i+1);
            alt.value = alternativer[j];
            alt.innerHTML = alternativer[j];
            alt.addEventListener("click", (e) => {
                answers["oppgave" + i] = e.target.id;
            })

            label.htmlFor = j.toString();
            label.innerHTML = alternativer[j];

            altList.appendChild(label)
            altList.appendChild(alt)
            altList.appendChild(document.createElement("br"))
        }
        quest.appendChild(altList)
        
    }
    const btn = document.createElement("button");
    btn.innerText = "Sjekk svar";
    btn.addEventListener("click", () => {
        let riktig = 0;
        for (let i = 0; i < oppgaver.length; i++) {
            if (+answers["oppgave" + i] === oppgaver[i].riktigIndex) {
                riktig++;
            }
        }
        resultat.innerText = riktig + " av 3 svar riktig";
    })
    liste.appendChild(btn);
    let resultat = document.createElement("p");
    liste.appendChild(resultat)
}

createOppggave(oppgaver);

// ========================== //
function leggTil() {
    const input = document.getElementById("inputTodo");
    const div = document.getElementsByClassName("todoList")[0];

    if(input.value.length) {
        addTodo(input.value, div, "test");
    }

}

function addTodo(value, parent, id) {
    const box = document.createElement('div');
    const child = document.createElement('input');
    const label = document.createElement('label');
    const doneList = document.getElementsByClassName("done")[0];

    child.type = 'checkbox';
    child.id = id;
    child.value = value;
    child.innerHTML = value;
    child.addEventListener('click', function() {

        if(this.checked) {
            this.parentElement.style.textDecoration = 'line-through';
            doneList.appendChild(this.parentElement.parentElement)

        } else {
            this.parentElement.style.textDecoration = 'none';
        }
    })

    label.htmlFor = id;
    label.innerHTML = value;


    label.insertAdjacentElement('beforeend', child);
    box.appendChild(label);
    parent.insertAdjacentElement("beforeend", box);


}