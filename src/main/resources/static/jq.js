$(function () {
    $("#inputTodo").click(function () {
        $("#inputTodo").val("")
    })
})

function addTodo(value) {
    //Create div
    var $box = $("<div id='box'></div>")
    //create input type radio
    var $child = $("<input id='inp' type='checkbox' value=" + value + " >" + value + "</input>").click(function () {
        this.parentElement.style.textDecoration = "line-through";

        $("div.done").append(this.parentElement)
    });
    //create inpout label
    $("div.todoList").append($box);
    $("#box").append($child)
}

$("#leggTil").click(function () {
    addTodo($("#inputTodo").val())
})
