$(document).ready(function () {
    selectRecipe();
    $('#chooseRecipe').on('change',function () {
        var recipe = $('#chooseRecipe').val();
        updateRecipe(recipe);
    })
   
})
function url() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
function selectRecipe(data) { 
    $.ajax({
        dataType: 'json',
        url: url(),
        success: (data) => getRecipe(data.recipes),//get recipe 
        error: () => console.log("Cannot get data"),
    })
}
var apiData = [];
function getRecipe(datas) {
    apiData = datas;
    var choose = "";
    apiData.forEach(element => {
        choose += `
            <option value="${element.id}">${element.name}</option> 
       `;  
    });
    $('#chooseRecipe').append(choose);//if we want display html and in js
}
$('#guest').hide();
function updateRecipe(recipeId) {

    apiData.forEach(element => {
        if (element.id == recipeId) {
            eachStep(element.instructions);
            eachRecipe(element.name,element.iconUrl);
            eachIngredient(element.ingredients);
            $('#member').val(element.nbGuests);
            $('#guest').show();
        }
    })
}
function eachStep(step) {
    var steps = step.split('<step>');
    var listStep = "";
    for (let i = 1; i < steps.length; i++) {
        listStep += `
        <li class = "list-group-item" style = "border:none">
        <strong class = "text-primary">Step: ${i}</strong>
        <br>
        &nbsp;&nbsp;
        ${steps[i]}
        </li>
     `
    }
    $('#step').html(listStep);
}
function eachRecipe(name,image){
    var recipes ="";
    recipes += `
        <strong>${name}</strong>
        <img src = "${image}" width = "100">
    `;
    $('#recipe').html(recipes);
}
function eachIngredient(ing) {
    var ingredient = "";
    ing.forEach(element => {
        ingredient += `
        <tr>
            <td><img src = "${element.iconUrl}" width = "50"></td>
            <td>${element.name}</td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
        </tr>
      `
    })
    $('#ingredient').html(ingredient);
}
function getMember(){
    var member = "";

}
function increase() {
    var member = $('#member').val();
    var guest = parseInt(member) + 1;
    if (guest <= 15) {
        $('#member').val(guest);
    }
}

function decrease() {
    var member = $('#member').val();
    var guest = parseInt(member) - 1;
    if (guest >= 1) {
        $('#member').val(guest);
    }
}



