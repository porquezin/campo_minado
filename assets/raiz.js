/*
Feito por:
Renato Magno
Fernando Yokoyama
Rodrigo Souza
*/
var table = []
var linha, coluna
var b, primeira_jogada, cell
var inter
var pontos = 0
var po1 = 0

function difculdade(dfc) {
    primeira_jogada = true
    switch (dfc) {
        case 1:
            gerar_tabela(8, 10, 10, 71)
            break;
        case 2:
            gerar_tabela(14, 18, 40, 213)
            break;
        case 3:
            gerar_tabela(20, 24, 99, 382)
            break;
    }
}

function gerar_tabela(l, c, bb, po) {
    table = []
    linha = l
    coluna = c
    b = bb
    po1 = po

    document.querySelector("#tabe").innerHTML = ""
    for (i = 0; i < c; i++) {
        table[i] = []
        for (j = 0; j < l; j++) {
            table[i][j] = 0
            document.querySelector("#tabe").innerHTML += "<input onclick='jogar(" + j + "," + i + ")' class='f' type='button' id=" + j + "|" + i + " value=' '>"
        }
        document.querySelector("#tabe").innerHTML += "<br>"
    }
}

function gerar_bombas(li, co) {
    var bomba = 0
    while (bomba < b) {
        x = Math.floor(Math.random() * (linha))
        y = Math.floor(Math.random() * (coluna))
        if (x != li && y != co) {
            table[y][x] = '💣'
            bomba++
        }
    }

    for (i = 0; i < coluna; i++) {
        for (j = 0; j < linha; j++) {
            if (table[i][j] != '💣') {
                if (table[i - 1] != undefined && table[i - 1][j - 1] == '💣') { table[i][j] += 1 }
                if (table[i - 1] != undefined && table[i - 1][j] == '💣') { table[i][j] += 1 }
                if (table[i - 1] != undefined && table[i - 1][j + 1] == '💣') { table[i][j] += 1 }

                if (table[i][j - 1] == '💣') { table[i][j] += 1 }
                if (table[i][j + 1] == '💣') { table[i][j] += 1 }

                if (table[i + 1] != undefined && table[i + 1][j - 1] == '💣') { table[i][j] += 1 }
                if (table[i + 1] != undefined && table[i + 1][j] == '💣') { table[i][j] += 1 }
                if (table[i + 1] != undefined && table[i + 1][j + 1] == '💣') { table[i][j] += 1 }
            }
        }
    }
    console.table(table)
}

function revela(li, co) {
    if (table[co][li] != undefined &&  document.getElementById(li + "|" + co).disabled != true) {
        document.getElementById(li + "|" + co).disabled = true
        document.getElementById(li + "|" + co).value = table[co][li]
        pontos++
    } else { return }
}

function dir(li, co) {
    if (table[li][co] != undefined) {
        while (table[co][li] == 0) {
            if (table[li + 1] != undefined) {
                if (table[li + 1] == 0) {
                    revelazero(li + 1, co)
                } else {
                    revela(li + 1, co)
                }
                li++
            } else { return }
        }
    }
}

function revelarall() {
    for (i = 0; i < coluna; i++) {
        for (j = 0; j < linha; j++) {
            document.getElementById(j + "|" + i).disabled = true
            document.getElementById(j + "|" + i).value = table[i][j]
        }
    }
}

function revelazero(li, co, ) {

    revela(li, co)

    if (table[co][li] == '💣') {
        crono = false
        alert('perdeu')
        revelarall()
        return
    }else if (pontos == po1) {
        alert('ganhou!')
        revelarall()
        return
    }

    if (table[co][li] == 0) {
        for (i = li - 1; i <= li + 1; i++) {
            for (j = co - 1; j <= co + 1; j++) {
                if (i >= 0 && i <= linha && j >= 0 && j <= coluna) {
                    if(document.getElementById(i + "|" + j)!=null){
                        if (document.getElementById(i + "|" + j).disabled != true) {
                            revela(i,j)
                            dir(i, j)
                            revelazero(i, j)
                        }
                    }
                }
            }
        }
    }
}

function jogar(li, co) {

    console.log(pontos)

    if (pontos == po1) {
        alert('ganhou!')
        return
    }
    
    if (primeira_jogada) {
        gerar_bombas(li, co)
        primeira_jogada = false
    }
    revelazero(li, co)
}