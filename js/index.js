$(document).ready(function () {
    selectRecipe();
    $('#chooseRecipe').on('change',function () {
        var recipe = $('#chooseRecipe').val();
        getRecipe(recipe);
    })
    $('#minus').on('click', function () {
        decrease();
        var guest = $('#member').val();//old member 4 it will decrease when click -
        var recipe = $('#chooseRecipe').val();//id from select
         updateRecipe(recipe,guest);
         $('member').html("")
    });
    $('#add').on('click', function () {
        increase();
        var guest = $('#member').val();//old member 4 it will increase when click +
        var recipe = $('#chooseRecipe').val();
         updateRecipe(recipe,guest);
    });
})
function url() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
function selectRecipe(data) { 
    $.ajax({
        dataType: 'json',
        url: url(),
        success: (data) => chooseRecipe(data.recipes),//get recipe 
        error: () => console.log("Cannot get data"),
    })
}
var apiData = [];
function chooseRecipe(datas) {
    apiData = datas;
    var choose = "";
    apiData.forEach(element => {
        choose += `
            <option value="${element.id}">${element.name}</option> 
       `;  
    });
    $('#chooseRecipe').append(choose);//if we want display html and in js
}
$('#guest,#appear,#ingredient,#input').hide();

var guestDefault = 1;
function getRecipe(recipeId) {
    apiData.forEach(element => {
        if (element.id == recipeId) {
            eachStep(element.instructions);
            eachRecipe(element.name,element.iconUrl);
            eachIngredient(element.ingredients);
             $('#member').val(element.nbGuests);
            $('#guest,#appear,#ingredient,#input').show();
            guestDefault = $('#member').val();
        }
    })
}
function updateRecipe(recipeId,guest){
    
    apiData.forEach(element => {
        if (element.id == recipeId) {
            eachStep(element.instructions);
            eachRecipe(element.name,element.iconUrl);
            updateIngredient(element.ingredients, guest);
            $('#member').val(guest);
            $('#guest').show();
        }
    })
}
function eachStep(step){
    //cut <step> frome instruction
    var steps = step.split('<step>');
    var listStep = "";
    var bg = ["","bg-primary","bg-success","bg-info","bg-danger"];
    for (let i = 1; i < steps.length; i++) {
        listStep += `
        <li class = "list-group-item " style = "border:5px solid pink;">
        <strong class = "text-primary">Step: ${i}</strong>
        <br>
        &nbsp;&nbsp;
        ${steps[i]}
        </li>
        <br>
     `
    }
    $('#step').html(listStep);
}
function eachRecipe(name,image){
    var recipes ="";
    recipes += `
        <strong class = "text-danger">${name}</strong>
        <img src = "${image}" width = "100" class = "rounded-circle">
    `;
    $('#recipe').html(recipes);
}
function eachIngredient(ing) {
    var ingredient = "";
    ing.forEach(element => {
        ingredient += `
        <tr>
            <td ><img src = "${element.iconUrl}" width = "50"></td>
            <td  class = "text-success">${element.name}</td>
            <td <span class = "badge badge-info">${element.quantity}</span></td>
            <td  class = "text-danger">${element.unit[0]}</td>
        </tr>
      `
    })
    $('#ingredient').html(ingredient);
}
var updateIngredient = (ing,guest) => {
    var ingredient = "";
    ing.forEach(element => {
       var add = element.quantity *parseInt( guest)/ guestDefault;
       ingredient += `
       <tr >
           <td><img src = "${element.iconUrl}" width = "50"></td>
           <td  class = "text-warning">${element.name}</td>
           <td><span class = "badge badge-info">${add}</span></td>
           <td  class = "text-primary">${element.unit[0]}</td>
       </tr>
     `
    })
    $('#ingredient').html(ingredient);
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
