window.onload = function(){
	
    console.log('onload');
	var profil = document.getElementById('ProfilLoeschen');
	
}

function deleteProfil() {
   var x = confirm("Möchten Sie wirklich Ihr Profil löschen?")
    
   if (x==true){
       alert("Ihr Profil wurde gelöscht.") 
        //logout
   }
    else {}
}


function test() {
   // req.user[6].id
var test = "Hallo Welt";
    window.write(test)
}