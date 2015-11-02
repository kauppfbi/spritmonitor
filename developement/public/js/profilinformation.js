var profil = document.getElementById('ProfilLoeschen');

function deleteProfil() {
   var x = confirm("Möchten Sie Ihr wirklich unwiderrufflich Profil löschen?")
    
   if (x==true){
   		var deleteQuery = window.location.origin + "/profilLoeschen?id=" + user.id;
       window.location.assign(deleteQuery);
   }
};
