document.getElementById("defaultOpen").click();

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent_info");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabcontent = document.getElementsByClassName("tabcontent_matches");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabcontent = document.getElementsByClassName("tabcontent_tournaments");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Получаем все элементы класса "tablinks" и убираем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    if (tabName === 'Tournaments'){
        document.getElementById("defaultOpenT").click();
    }
    if (tabName === 'Achievements'){
        document.getElementById("defaultOpenA").click();
    }

    // Показываем текущую вкладку и добавляем класс "active" к кнопке, на которую нажали
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openSubTab(evt, tabName, subTabName){
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent_info");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabcontent = document.getElementsByClassName("sub_tabcontent_tournaments");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabcontent = document.getElementsByClassName("sub_tabcontent_achievements");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Получаем все элементы класса "tablinks" и убираем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id != subTabName + "_button"){
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }

    // Показываем текущую вкладку и добавляем класс "active" к кнопке, на которую нажали
    document.getElementById(tabName).style.display = "block";
    document.getElementById(subTabName).style.display = "block";
    evt.currentTarget.className += " active";
}