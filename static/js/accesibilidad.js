$(document).keydown(function(e){
    var vAnotherKeyWasPressed = false;

    if(!vAnotherKeyWasPressed && e.which === 49 && e.altKey ){
        //Focus the menu
        $('#menu1').focus();
        document.getElementById('menu1').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    }
    if(!vAnotherKeyWasPressed && e.which === 50 && e.altKey ){
        //Focus the menu
        $('#menu2').focus();
        document.getElementById('menu2').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    } 
    if( !vAnotherKeyWasPressed && e.which === 51 && e.altKey ){
        //Focus the menu
        $('#menu3').focus();
        document.getElementById('menu3').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    } 
    if(  !vAnotherKeyWasPressed && e.which === 52 && e.altKey ){
        //Focus the menu
        $('#menu4').focus();
        document.getElementById('menu4').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    }  
    if(!vAnotherKeyWasPressed &&  e.which === 53 && e.altKey ){
        //Focus the menu
        $('#menu5').focus();
        document.getElementById('menu5').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    }  
    if( !vAnotherKeyWasPressed && e.which === 54 && e.altKey ){
        //Focus the menu
        $('#menu6').focus();
        document.getElementById('menu6').click();
        //Stop the events for the key to avoid windows set the focus to the browser toolbar 
        return false;
    }  

       
  });

 