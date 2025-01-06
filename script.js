function insert(num) {
    var numero = document.getElementById('resultado').value;
    document.getElementById('resultado').value = numero + num;
}

function clean() {
    document.getElementById('resultado').value = "";
}

function back() {
    var resultado = document.getElementById('resultado').value;
    document.getElementById('resultado').value = resultado.substring(0, resultado.length - 1);
}

function calcular() {
    var resultado = document.getElementById('resultado').value;
    if (resultado) {
        try {
            document.getElementById('resultado').value = eval(resultado);
        } catch (e) {
            document.getElementById('resultado').value = "Erro!";
        }
    } else {
        document.getElementById('resultado').value = "Nada...";
    }
}
