var table = []
var linha, coluna

function gerar_tabela(l, c) { //função feita somente para gerar o tabuleiro!
    table = []
    linha = l - 1
    coluna = c - 1
    document.querySelector("#tabe").innerHTML = ""
    for (i = 0; i < l; i++) {
        table[i] = []
        for (j = 0; j < c; j++) {
            table[i][j] = 0
            document.querySelector("#tabe").innerHTML += "<input type='button' id=" + i + "|" + j + " value='0'>"
        }
        document.querySelector("#tabe").innerHTML += "<br>"
    }
    console.table(table)
}
function gerar_bombas(b) {
    var bomba = 0
    console.table(table)
    while (bomba < b) {
        x = Math.floor(Math.random() * (linha - 0 + 1)) + 0
        y = Math.floor(Math.random() * (coluna - 0 + 1)) + 0
        if (table[x][y] == 0) {
            table[x][y] = 1
            document.getElementById(x+"|"+y).value=1
            bomba++
        }else{
            document.getElementById(x+"|"+y).value=1
        }
    }
    console.log(bomba)
    console.table(table)
}