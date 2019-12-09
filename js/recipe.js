$(document).ready(function () {
    selectRecipe();
    $('#chooseRecipe').on('change',function () {
        var recipe = $('#chooseRecipe').val();
        chooseRecipe(recipe);
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
    })
}
var allData = [];
/////select recipe
function getRecipe(datas) {
    allData = datas;
    //console.lot(allData or datas);
    var choose = "";
    allData.forEach(element => {
        choose += `
            <option value="${element.id}">${element.name}</option> 
       `;  
    });
    $('#chooseRecipe').append(choose);//if we want display html and in js
}
////display select
function chooseRecipe(recipe){
    //convert string to number
    switch(parseInt(recipe)){
        case 0:
            getRecipe1();
            break;
        case 1:
            getRecipe2();
            break;
    }
}
//recipe1
function getRecipe1(){
    allData.forEach(element => {
        if(element.id == 0){
            recipe(element.name,element.iconUrl);
            ///console.log(element.name + element.iconUrl);
        }
    })
}
//select2 rench creb
function getRecipe2(){
    allData.forEach(element => {
        if(element.id == 1){
            recipe(element.name,element.iconUrl);
            ///console.log(element.name + element.iconUrl);
        }
    })
}

function recipe(name,image){
    var result = "";
    result +=   `
        <strong>${name}</strong>
        <img src = "${image}" width = "100">
    `;
    $('#recipe').html(result);
}

