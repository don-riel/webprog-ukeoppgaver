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