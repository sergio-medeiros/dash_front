function enviar(){
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Valores digitados = "+txtEmail+" / "+ txtSenha);

    var msgBody = {
        email: txtEmail,
        senha: txtSenha
    }
    var cabecalho = {
        method: 'POST',
        body: JSON.stringify(msgBody),
        headers: {
            'Content-type':'application/json'
        }
    }
    fetch("http://localhost:8080/login",cabecalho)
        .then(res=>tratarResultado(res));
}
function tratarResultado(resp){
    if (resp.status == 200){
        //alert("Usuário IDENTIFICADO");
        document.getElementById("res").innerHTML = "";
        resp.json().then(res => efetivarLogin(res));

    }
    else if(resp.status == 404){
        //alert("Usuario NAO FOI ENCONTROADO NA NOSSA BASE");
        document.getElementById("res").innerHTML = "<h3>Usuario não encontrado</h3>";
    }
    else if (resp.status == 403){
        //alert("Senha INVALIDA");
        document.getElementById("res").innerHTML
        document.getElementById("res").innerHTML = "<h3>Senha Inválida</h3>";
    }
}   
function efetivarLogin(res){
    // qual a idéia? gravar no LocalStorage o objeto que eu recebi
    // redirecionar para a página HOME.HTML
    localStorage.setItem("userDash",JSON.stringify(res));
    window.location="home.html";
}
