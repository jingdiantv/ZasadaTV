var text_field_half_select = document.getElementById("text_field_half_select");
var selectText = document.getElementById("selectText");
var text_field_half_options = document.getElementsByClassName("text_field_half_options");
var select_list = document.getElementById("select_list");
var arrowIcon = document.getElementById("arrowIcon");

text_field_half_select.onclick = function(){
    select_list.classList.toggle("hide");
    arrowIcon.classList.toggle("rotate");
}

for (option of text_field_half_options){
    option.onclick = function(){
        selectText.innerHTML = this.textContent;
        selectText.style.color = "white";
        select_list.classList.toggle("hide");
        arrowIcon.classList.toggle("rotate");
    }
}
