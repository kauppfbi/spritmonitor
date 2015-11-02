function updateFahrzeuginfo() {  
   var updateQuery = window.location.origin;
    
    if(fahrzeuge.length == 1){
        updateQuery += '/fahrzeug?id=' + fahrzeuge[0];
    } else{
        updateQuery += '/fahrzeuge?id';
        for(var i=0;i<fahrzeuge.length;i++){  
            if(i==fahrzeuge.length-1){
                updateQuery += fahrzeuge[i].id;
            }else{
                updateQuery += fahrzeuge[i].id + ",";
            }
        }
    }
    window.location.assign(updateQuery);
};