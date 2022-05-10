var table = []
var linha, coluna
var b, primeira_jogada
var win = false
var count

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

function revelarall() {
    for (i = 0; i < coluna; i++) {
        for (j = 0; j < linha; j++) {
            document.getElementById(j + "|" + i).value = table[i][j]
        }
    }
}

function revela(li, co) {
    document.getElementById(li + "|" + co).value = table[co][li]
    document.getElementById(li + "|" + co).disabled=true
}

function revelacelula(li, co, user) {
revela(li,co)
    if (table[co][li] == 0) {
        revelazero(li, co)
    }

    if (table[co][li] == 'B' && user) {
        revelarall()
        alert('perdeu')
    }

}

function desce(li,co){
    while (table[co][li] == 0) {
        if (table[co + 1] != undefined) {
            revela(li, co + 1)
            co++
        }
    }
}
function sobe(li,co){
    while (table[co][li] == 0) {
        if (table[co - 1] != undefined) {
            revela(li, co - 1)
            co--
        }
    }
}
function dir(li,co){

    while (table[co][li] == 0) {
        if (table[li + 1] != undefined) {
            revela(li+1,co)
            li++
        }
    }

}
function esc(li,co){

    while (table[co][li] == 0) {
        if (table[li - 1] != undefined) {
            revela(li-1,co)
            li--
        }
    }

}

function revelazero(li, co,count) {
    debugger
    count = 0
    let att_li = li 
    let att_co = co 
    revela(li, co)

    
    desce(att_li,att_co)
    sobe(att_li,att_co)

    dir(att_li,att_co)
    esc(att_li,att_co)

}

function jogar(li, co) {

    if (primeira_jogada) {


        gerar_bombas(li, co)

        primeira_jogada = false

    }

    revelacelula(li, co, true)

}