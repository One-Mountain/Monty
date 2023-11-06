window.onload = function() {
    wins_stay = 0;
    stay_games = 0;  
    wins_switched = 0;
    switch_games = 0;   
    var w = document.getElementById('info') // help button
                .onclick = function() {
                    document.getElementById('inform').innerHTML = "This is supposed to mimic the Monty Hall problem. <br/>" + 
                                                                  "The game is to pick the door with the car and you<br/>" +
                                                                  "get to win the car if you choose correctly. However,<br/>" +
                                                                  "if you choose the other two doors, they only have  <br/>" +
                                                                  "donkeys. <br/>" + 
                                                                  "After picking a door, the game will open a door <br/>" +
                                                                  "with a donkey in it. Then it will ask if you want <br/>" +
                                                                  "to switch doors. <br/>" + 
                                                                  "The probability winning with your own door is 1/3<br/>" +
                                                                  "but if you switch doors, the probability increases<br/>" +
                                                                  "to 1/2. Good luck, and try the game. <br/>";

                }
    function start() {
        var ra = Math.floor(Math.random() *3)+1; // creates the random door number (1 is left, 2 is middle, 3 is right)

        var checker = 0;
        var picked = 0;  // gets the door the player picked. 
        var switched = false;
        var x = document.getElementById('LDoor') // when you click on the doors...
                    .onclick = function() {
                        if (checker == 0) {
                            document.getElementById('LDoor').style.backgroundColor = 'yellow';
                            checker = 1;
                            picked = 1;
                            continuation(picked,ra)
                        }
                    }
    var y = document.getElementById('CDoor')
                    .onclick = function() {
                         if (checker == 0) {
                               document.getElementById('CDoor').style.backgroundColor = 'yellow';
                               checker = 1;
                               picked = 2;
                               continuation(picked,ra)
        }
    }
    var z = document.getElementById('RDoor')
                    .onclick = function() {
                        if (checker == 0) {
                            document.getElementById('RDoor').style.backgroundColor = 'yellow';
                            checker = 1;
                            picked = 3;
                            continuation(picked,ra)
        }
    }
    }
    start();
    function continuation(p, r){
        var checker2 = 0;  
        document.getElementById('game').innerHTML = 'So you have picked door number ' + p + '! <br />'+
                                                    'Now I will show you a donkey door! <br />';
        var a = ['LDoor', 'CDoor', 'RDoor']
        var donkey = a.filter(function(d){
                    var cc = d!=a[r-1]
                    var dd = d!=a[p-1]
                    return cc && dd;
        });
        var len_donkey = donkey.length;
        var ran = Math.floor(Math.random()*len_donkey);
        var opened = donkey[ran]
        document.getElementById(opened).src = 'openDoor.png';
        document.getElementById('game').appendChild(document.createTextNode(" Dare to switch? Click an appropriate door to continue."))
        var switch_door_name = a.filter(function(d){
                    var cc = d!=a[p-1] //can't be the initial door picked. 
                    var dd = d!=donkey[ran]; // can't be the donkey door that was opened. 
                    return cc && dd; 

        })
        var s = a.indexOf(String(switch_door_name))+1
        
        document.getElementById(a[p-1]).addEventListener('click', function(){ // the picked door.
                    if (checker2 == 0) {
                        checker2 = 1;
                        if(p == r){
                            document.getElementById('game').innerHTML = "YOU WON!";
                            wins_stay += 1;
                            stay_games += 1;
                        }
                        else{
                           document.getElementById('game').innerHTML = "YOU LOSE!"
                            stay_games +=1; 
                        }
                        percentStay = wins_stay/stay_games* 100;

                        if (switch_games ==0){percentSwitch = 0;}
                        else { percentSwitch = wins_switched/switch_games* 100};
                        document.getElementById('stats').innerHTML = "Game Statistics: <br />" + 
                            "Won with stay: " + percentStay +"%  <br />" +
                            "Won with switch: "+ percentSwitch + '% <br />';
                }; });
        document.getElementById(switch_door_name).addEventListener('click',function(){ //switched doors
                    if (checker2 == 0 ){
                        checker2 = 1;
                        if(s == r){
                            document.getElementById('game').innerHTML = "YOU WON!";
                            wins_switched += 1;
                            switch_games += 1;
                        }
                        else{
                           document.getElementById('game').innerHTML = "YOU LOSE!"
                            switch_games +=1; 
                        }
                        percentSwitch = wins_switched/switch_games* 100;

                        if (stay_games ==0){percentStay = 0;}
                        else { percentStay = wins_stay/stay_games* 100};

                        document.getElementById('stats').innerHTML = "Game Statistics: <br />" + 
                            "Won with stay: " + percentStay +"%  <br />" +
                            "Won with switch: "+ percentSwitch + '% <br />';
                        }
                    });
                
        
    }
    
    document.getElementById('res')
                .onclick = function(){
                        document.getElementById('inform').innerHTML = "Click below for information";
                        document.getElementById('LDoor').style.backgroundColor = 'transparent';
                        document.getElementById('CDoor').style.backgroundColor = 'transparent';
                        document.getElementById('RDoor').style.backgroundColor = 'transparent';

                        document.getElementById("LDoor").src = 'closedDoor.png';
                        document.getElementById("CDoor").src = 'closedDoor.png';
                        document.getElementById("RDoor").src = 'closedDoor.png';
                        document.getElementById('game').innerHTML ="Welcome to the game new contestant! Please, pick a door!"
                        if (switch_games == 0){percentSwitch = 0;}
                        else { percentSwitch = wins_switched/switch_games* 100};

                        if (stay_games ==0){percentStay = 0;}
                        else { percentStay = wins_stay/stay_games* 100};

                        document.getElementById('stats').innerHTML = "Game Statistics: <br />" + 
                            "Won with stay: " + percentStay +"%  <br />" +
                            "Won with switch: "+ percentSwitch + '% <br />';
                        start();


                } 

            
            
            
            
            
            
}