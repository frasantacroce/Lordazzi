var tabButton=document.querySelectorAll(".tabContainer .buttonContainer button");
var tabPanel= document.querySelectorAll(".tabContainer .tabPanel");
var tableLordi=document.querySelector(".Maintable")
var tableLogin=document.querySelector(".loginForm")
var loggedUser;
var loggedNickname;
var date = new Date();
var colorCode = '#f44336';
var panelIndex;
var chosenTab = 0;
var Coinqui;
var Turni;
const headr = "<tr><th>Lordazzo</th><th>Data</th></tr>";
var turno= new Array;
var tableLordazzi = document.getElementById("tableLordazzi");

function resetDB() {
    var answ = confirm("Sei sicuro?");
    if (answ) {
        const resetData = { reset: true };
        const options = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resetData)
        }
        resetRequest();
        
        async function resetRequest(){
            const response = await fetch('/resetRequest', options).then(showPanel(chosenTab));
        }
    }
};
  

function getInfo() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const loginData = { username, password};
    const options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    }
    loginRequest();
    
    async function loginRequest(){
        const response = await fetch('/loginRequest', options);
        const data = await response.json();
        switch (data.status) {
            case 'success': 
                        loggedUser = data.loggeduser;
                        loggedNickname = data.loggednickname;
                        updateUser()
                        break;
            case 'failed':
                if (data.error == 'credentials') {
                            alert('Wrong credentials')
                            return
                } else if (data.error == 'password'){
                            alert('Wrong password')
                            return
                }
        }
    };
    
};

function updateUser() {
    tableLogin.style.display="none";
    tableLordi.style.display="block";
    showPanel(0);
    document.getElementById("userLog").textContent = 'Logged user: '+loggedUser;
};

function showPanel(panelIndex) {
    chosenTab = panelIndex;

    tabButton.forEach(function(node){
        node.style.backgroundColor="";
        node.style.color = "";
    });

    tabButton[panelIndex].style.backgroundColor=colorCode;
    tabButton[panelIndex].style.color="white";
    
    tabPanel[0].style.display="block";
    tabPanel[0].style.backgroundColor=colorCode;
    tableLordazzi.textContent = "";
    var row;
    var cell
    row = document.createElement('tr');
    cell = document.createElement('th');
    cell.appendChild(document.createTextNode('Lordazzo'));
    row.appendChild(cell);
    cell = document.createElement('th');
    cell.appendChild(document.createTextNode('Data'));
    row.appendChild(cell);
    
    tableLordazzi.appendChild(row);
    
    getTurni();
    
    async function getTurni(){
        const response = await fetch('/getTurni'+chosenTab);
        const data = await response.json();

        Turni = data;
        
        const numTurni = Object.keys(Turni).length;
        const TurniMin = (numTurni > 5) ? numTurni-5 : 0;
        
        
        for (var j = TurniMin; j<numTurni; j++){
            row = document.createElement('tr');
            cell = document.createElement('td');
            cell.appendChild(document.createTextNode(Turni[j].loggedNickname));
            row.appendChild(cell);
            cell = document.createElement('td');
            var date = new Date(parseInt(Turni[j].timeStamp));
            date = date.toLocaleString();
            cell.appendChild(document.createTextNode(date));
            row.appendChild(cell);
            tableLordazzi.appendChild(row);
        }
        
    }
};

function lavoIo (){
    var j = 0;

    const turno = {loggedNickname}
    const options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(turno)
    }
    postTurni();

    async function postTurni() {
        const response = await fetch('/postTurni'+chosenTab, options);
    }

    

    alert(loggedUser+' lava alle '+ date.getHours()+':'+date.getMinutes()+' il '+date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear());
    showPanel(chosenTab);
}
