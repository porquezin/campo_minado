var table = []
var linha, coluna
var b, primeira_jogada
var win = false

function difculdade(dfc) {
    win = false
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

function gerar_tabela(l, c, bb) {
    table = []
    linha = l
    coluna = c
    b = bb

    document.querySelector("#tabe").innerHTML = ""
    for (i = 0; i < c; i++) {
        table[i] = []
        for (j = 0; j < l; j++) {
            table[i][j] = 0
            document.querySelector("#tabe").innerHTML += "<input onclick='jogar(" + j + "," + i + ")' type='button' id=" + j + "|" + i + " value=' '>"
        }
        document.querySelector("#tabe").innerHTML += "<br>"
    }
}

function gerar_bombas(li, co) {
    var bomba = 0
    while (bomba < b) {
        x = Math.floor(Math.random() * (linha))
        y = Math.floor(Math.random() * (coluna))
        if (x == li && y == co) {
            continue
        } else {
            if (table[y][x] == 0) {
                table[y][x] = 'B'
                bomba++
            }
        }
    }

    for (i = 0; i < coluna; i++) {
        for (j = 0; j < linha; j++) {
            if (table[i][j] != 'B') {
                if (table[i - 1] != undefined && table[i - 1][j - 1] == 'B') { table[i][j] += 1 }
                if (table[i - 1] != undefined && table[i - 1][j] == 'B') { table[i][j] += 1 }
                if (table[i - 1] != undefined && table[i - 1][j + 1] == 'B') { table[i][j] += 1 }

                if (table[i][j - 1] == 'B') { table[i][j] += 1 }
                if (table[i][j + 1] == 'B') { table[i][j] += 1 }

                if (table[i + 1] != undefined && table[i + 1][j - 1] == 'B') { table[i][j] += 1 }
                if (table[i + 1] != undefined && table[i + 1][j] == 'B') { table[i][j] += 1 }
                if (table[i + 1] != undefined && table[i + 1][j + 1] == 'B') { table[i][j] += 1 }
            }
        }
    }
    console.table(table)
}

function revelazero(li, co) {
    //termina pra eu plz kkk
    document.getElementById(li + "|" + co).disabled = true
    document.getElementById(li + "|" + co).value = table[co][li]

    if (table[co][li] == 0) {
        for (i = li - 1; i <= li + 1; i++) {
            for (j = co - 1; j <= co + 1; j++) {
                if (i >= 0 && i <= linha && j >= 0 && j <= coluna) {
                    var cell = document.getElementById(i + "|" + j)
                    if (cell.className != "a") {
                        cell.className = "a"
                        document.getElementById(li + "|" + co).value = table[co][li]
                        revelazero(i, j)
                    }
                }
            }
        }
    }
}

function jogar(li, co) {
    if (primeira_jogada) {
        gerar_bombas(li, co)
        primeira_jogada = false
    }
    revelazero(li, co)
}