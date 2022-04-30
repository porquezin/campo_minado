function gerar_tabela(l,c){
/*Idea de como criar a tabela (to achadno meme pq ta complexo de mais!)
resumindo: quando eu coloco na função ele nao se comporta do mesmo jeito que deveria
então to pensando ainda como eu vou fazer
se eu nao achar eu tento fazer assim!(com tabela)
    for(i=0;i<5;i++){
        document.getElementById("tab").innerHTML+="<tr>"
            for(j=0;j<5;j++){
                document.getElementById("tab").innerHTML+="<td>a"
                document.getElementById("tab").innerHTML+="</td>"
            }
            document.getElementById("tab").innerHTML+="</tr>"
    }
com botão acho que fica mais de boa!
    */
document.querySelector("#tabe").innerHTML=""
   for(i=0;i<l;i++){
       
       for(j=0;j<c;j++){
        document.querySelector("#tabe").innerHTML+="<input type='button' value='1'>"
    }
    document.querySelector("#tabe").innerHTML+="<br>"
}

}