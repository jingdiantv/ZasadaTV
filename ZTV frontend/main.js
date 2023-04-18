function getValue(e){
    console.log(e.value);
}
var fsubmit = document.getElementById("loginsubmit");

        fsubmit.addEventListener("click", function(e){
            var login = document.getElementById("login");
            var password = document.getElementById("password");
            if(login.value != "" && password.value != ""){
                getValue(login);
                getValue(password);
            }
            else {
            this.style.backgroundColor = 'red';
            this.value = "Введите логин и пароль"
            setTimeout(function(e){
                fsubmit.style.backgroundColor = '#4d4d4d';
            }, 1000);
            setTimeout(function(e){
                fsubmit.value = 'Войти';
            }, 1000);
            }
        });