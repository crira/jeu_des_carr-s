window.onload  = function () {
    creerGrille();
    
    compteur = setInterval('decompte();',100);
}

var largeurGrille  = 5; // largeur en nombre de gros carré
var joueurActif = 0; //retient le joueur actif
var scoreJ1=0;
var scoreJ2=0;
var temps = 100; // on met le temps du decompte en dixième de seconde

var tmp =temps;



function creerGrille(){// création de la grille de jeu dans un tableau html
    
    
    var text="<TABLE> ";
    for (var i=1;i<=(largeurGrille*2+1);i++){
        text+="<tr>";
        for(var j=1;j<=(largeurGrille*2+1);j++){ 
            if(i%2!=0&&j%2!=0){//ces cases sont les petits carrés entre les traits
                text+="<td id="+j+"-"+i+" class=\"petit\"></td>";
            }
            else{ // ces cases sont les traits horizontaux
            if(i%2!=0){
                text+="<td id="+j+"-"+i+" class=\"largeur\" onclick=\"colorier(this)\"></td>";// appelle de la fonction colorier uniquement sur les traits fins
            }
            else{ // ces cases sont les traits verticaux
                if(j%2!=0){
                    text+="<td id="+j+"-"+i+" class=\"hauteur\" onclick=\"colorier(this)\"></td>";// appelle de la fonction colorier uniquement sur les traits fins
            }
            else{ // ces cases sont les gros carrés a prendre
                text+="<td id="+j+"-"+i+" class=\"gros\"></td>"
            }
            }}
        }
        text+="</tr>";
    }
    text+="</TABLE>";
    
    // insertion du tableau dans le HTML
    document.getElementById("jeu").innerHTML=text;
    
    // initialisation des scrores dans le HTML
    document.getElementById("score1").innerHTML=scoreJ1;
    document.getElementById("score2").innerHTML=scoreJ2;
    if(joueurActif==0)
                document.getElementById("joueur").innerHTML="TOUR JOUEUR 1";
            else 
                document.getElementById("joueur").innerHTML="TOUR JOUEUR 2";
    
}

function colorier(trait){// fonction qui colorie (elle porte plutot bien son nom)
    
    if(document.getElementById(trait.id).classList.item(1)==null){ // on verifie que le trait sur lequel on clique n'est pas déjà pris
        
        var precedentScore=0;// on initialise le score avant de jouer
        if(joueurActif==0)
                precedentScore=scoreJ1;
            else 
                precedentScore=scoreJ2;
        
        //on ajoute la classe du joueur a la case qu'il a séléctionner
        document.getElementById(trait.id).classList.add("joueur"+(joueurActif+1));
        //on test si il a complété un ou plusieurs carrés
        testCarre(trait);
        
        //on regarde si les scores on bouger
        if(joueurActif==0&&precedentScore==scoreJ1||joueurActif==1&&precedentScore==scoreJ2)
                joueurActif=(joueurActif+1)%2;// si les scrores n'ont pas bougé on change de joueur
            
        //on actualise les scores dans le HTML
        document.getElementById("score1").innerHTML=scoreJ1;
        document.getElementById("score2").innerHTML=scoreJ2;
        if(joueurActif==0)
                document.getElementById("joueur").innerHTML="TOUR JOUEUR 1";
            else 
                document.getElementById("joueur").innerHTML="TOUR JOUEUR 2";
        tmp =temps;
    }
}

function testCarre(trait){ // le test des carré (c'est le plus sympa :D)
    
    // on split l'id de la case pour avoir les coordonnés en x et y de la case
    var idTrait=trait.id.split(/-/);
    coordX=parseInt(idTrait[0]);
    coordY=parseInt(idTrait[1]);
    
    // si la case est vertical
    if(document.getElementById(trait.id).classList.item(0)=="hauteur"){
        //on regarde si les 3 autres traits a droite sont remplis
        if(coordX<(largeurGrille*2+1)&&document.getElementById((coordX+2)+"-"+coordY).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX+1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById((coordX+1)+"-"+coordY).classList.add("joueur"+(joueurActif+1));//on change la couleur de la case
            // on met le score a jour
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
            
        }
        //on regarde si les 3 autres traits a gauche sont remplis
        if(coordX>1&&document.getElementById((coordX-2)+"-"+coordY).classList.item(1)!=null && document.getElementById((coordX-1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById((coordX-1)+"-"+coordY).classList.add("joueur"+(joueurActif+1));//on change la couleur de la case
            // on met le score a jour
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
    }
    
    // si la case est horizontal
    if(document.getElementById(trait.id).classList.item(0)=="largeur"){
        //on regarde si les 3 autres traits en bas sont remplis
        if(coordY<(largeurGrille*2+1)&&document.getElementById(coordX+"-"+(coordY+2)).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY+1)).classList.item(1)!=null){
            document.getElementById(coordX+"-"+(coordY+1)).classList.add("joueur"+(joueurActif+1));//on change la couleur de la case
            // on met le score a jour
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
        //on regarde si les 3 autres traits en haut sont remplis
        if(coordY>1&&document.getElementById(coordX+"-"+(coordY-2)).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY-1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById(coordX+"-"+(coordY-1)).classList.add("joueur"+(joueurActif+1));//on change la couleur de la case
            // on met le score a jour
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
    }
    
}

function decompte()
{
     tmp--;

    if (tmp > 0) {
        document.getElementById('timer').innerHTML = tmp/10;
    }
    else {tmp=temps;
        document.getElementById('timer').innerHTML = tmp/10;
        joueurActif=(joueurActif+1)%2;
        if(joueurActif==0)
                document.getElementById("joueur").innerHTML="C'est au joueur 1";
            else 
                document.getElementById("joueur").innerHTML="C'est au joueur 2";
        tmp=temps;
        // clearInterval(compteur);
    }
    

}

