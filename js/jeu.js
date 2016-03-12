window.onload  = function () {
    creerGrille();
    
}

var largeurGrille  = 5; // largeur en nombre de gros carré
var joueurActif = 0; //retient le joueur actif
var scoreJ1=0;
var scoreJ2=0;

function creerGrille(){
    var text="<TABLE> ";
    for (var i=1;i<=(largeurGrille*2+1);i++){
        text+="<tr>";
        for(var j=1;j<=(largeurGrille*2+1);j++){
            if(i%2!=0&&j%2!=0){
                text+="<td id="+j+"-"+i+" class=\"petit\"></td>";
            }
            else{
            if(i%2!=0){
                text+="<td id="+j+"-"+i+" class=\"largeur\" onclick=\"colorier(this)\"></td>";
            }
            else{
                if(j%2!=0){
                    text+="<td id="+j+"-"+i+" class=\"hauteur\" onclick=\"colorier(this)\"></td>";
            }
            else{
                text+="<td id="+j+"-"+i+" class=\"gros\"></td>"
            }
            }}
        }
        text+="</tr>";
    }
    text+="</TABLE>";
    document.getElementById("jeu").innerHTML=text;
    
}

function colorier(trait){
    if(document.getElementById(trait.id).classList.item(1)==null){
        var precedentScore=0;
        console.log("joueur"+(joueurActif+1));
        if(joueurActif==0)
                precedentScore=scoreJ1;
            else 
                precedentScore=scoreJ2;
        document.getElementById(trait.id).classList.add("joueur"+(joueurActif+1));
        testCarre(trait);
        
        
        if(joueurActif==0&&precedentScore==scoreJ1||joueurActif==1&&precedentScore==scoreJ2)
                joueurActif=(joueurActif+1)%2;
            
        
        document.getElementById("score1").innerHTML=scoreJ1;
        document.getElementById("score2").innerHTML=scoreJ2;
        
        
        
    }
}

function testCarre(trait){
    var idTrait=trait.id.split(/-/);
    coordX=parseInt(idTrait[0]);
    coordY=parseInt(idTrait[1]);
    console.log(coordX);
    if(document.getElementById(trait.id).classList.item(0)=="hauteur"){
        if(coordX<(largeurGrille*2+1)&&document.getElementById((coordX+2)+"-"+coordY).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX+1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById((coordX+1)+"-"+coordY).classList.add("joueur"+(joueurActif+1));
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
            
        }
        if(coordX>1&&document.getElementById((coordX-2)+"-"+coordY).classList.item(1)!=null && document.getElementById((coordX-1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById((coordX-1)+"-"+coordY).classList.add("joueur"+(joueurActif+1));
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
    }
    if(document.getElementById(trait.id).classList.item(0)=="largeur"){
        if(coordY<(largeurGrille*2+1)&&document.getElementById(coordX+"-"+(coordY+2)).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY+1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY+1)).classList.item(1)!=null){
            document.getElementById(coordX+"-"+(coordY+1)).classList.add("joueur"+(joueurActif+1));
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
        if(coordY>1&&document.getElementById(coordX+"-"+(coordY-2)).classList.item(1)!=null && document.getElementById((coordX+1)+"-"+(coordY-1)).classList.item(1)!=null&& document.getElementById((coordX-1)+"-"+(coordY-1)).classList.item(1)!=null){
            document.getElementById(coordX+"-"+(coordY-1)).classList.add("joueur"+(joueurActif+1));
            if(joueurActif==0)
                scoreJ1++
            else 
                scoreJ2++;
        }
    }
    
    
    
    
    
}
