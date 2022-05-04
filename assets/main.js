var table = []
var linha, coluna
var b, primeira_jogada


function difculdade(dfc) {
    primeira_jogada = true
    switch (dfc) {
        case 1:
            gerar_tabela(8, 10, 10)
            break;
        case 2:
            gerar_tabela(14, 18, 40)
            break;
        case 3:
            gerar_tabela(20, 24, 99)
            break;
    }
}

function gerar_tabela(l, c, bb) { //função feita somente para gerar o tabuleiro!
    table = []
    linha = l
    coluna = c
    b = bb

    document.querySelector("#tabe").innerHTML = ""
    for (i = 0; i < (c+1); i++) {
        table[i] = []
        for (j = 0; j < (l+1); j++) {
            table[i][j] = 0
            document.querySelector("#tabe").innerHTML += "<input onclick='jogar(" + j + "," + i + ")' type='button' id=" + j + "|" + i + " value='0'>"
        }
        document.querySelector("#tabe").innerHTML += "<br>"
    }
}

function gerar_bombas() {
    var bomba = 0
    while (bomba < b) {
        x = Math.floor(Math.random() * (linha))
        y = Math.floor(Math.random() * (coluna))
        if (table[y][x] == 0) {
            table[y][x] = 1
            document.getElementById(x + "|" + y).value = 1
            bomba++
        }
    }
   /* for(i=0;i<coluna;i++){
        for(j=0;j<linha;j++){
            if(table[i][j]!=0){
                if(table[i+1][j]!=1 ||table[i][j+1]!=1){
                    table[i+1][j]+='a'
                    table[i][j+1]+='a'
                    table[i+1][j+1]+='a'
                    table[i-1][j]+='a'
                    table[i][j-1]+='a'
                    table[i-1][j-1]+='a'
                    table[i+1][j-1]+='a'
                    table[i-1][j+1]+='a'
                }
            }
        }
    }*/
    console.table(table)
}

function jogar(li, co) {
    if (primeira_jogada) {
        gerar_bombas()
        primeira_jogada = false
    }
}