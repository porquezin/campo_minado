var table = []
var linha, coluna
var b, primeira_jogada, cell
var minutes = 0, seconds = 0
var clock = true
var inter

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
    if (table[co][li] != undefined) {
        document.getElementById(li + "|" + co).disabled = true
        document.getElementById(li + "|" + co).className = 'a'
        document.getElementById(li + "|" + co).value = table[co][li]
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

function revelazero(li, co) {

    document.getElementById(li + "|" + co).disabled = true
    document.getElementById(li + "|" + co).value = table[co][li]

    if (table[co][li] == '💣') {
        crono = false
        clearInterval(inter)
        alert('perdeu')
        revelarall()
        return
    }

    if (table[co][li] == 0) {
        for (i = li - 1; i <= li + 1; i++) {
            for (j = co - 1; j <= co + 1; j++) {
                if (i >= 0 && i <= linha && j >= 0 && j <= coluna) {
                    if (document.getElementById(i + "|" + j).className != "a") {
                        document.getElementById(li + "|" + co).value = table[co][li]
                        document.getElementById(i + "|" + j).className = "a"
                        dir(i, j)
                        revelazero(i, j)
                    }
                }
            }
        }
    }
}

const getHours = () => {
    const clock = document.getElementById('clock')
    seconds++
    if (seconds == 60) {
        seconds = 0
        minutes++
    }
    clock.innerHTML = `${minutes}:${seconds}`
}


function jogar(li, co) {
    getHours()
    if (clock) {
        clock = false
        getHours()
        inter = setInterval(() => { getHours() }, 1000)
    }
    if (primeira_jogada) {
        gerar_bombas(li, co)
        primeira_jogada = false
    }
    revelazero(li, co)
}