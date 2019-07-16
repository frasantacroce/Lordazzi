const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('fetch')
require('dotenv').config();
var loggedIn = false;
const date = new Date();

const Coinqui = [
    {
        "name": "Francesco",
        "surname": "Santacroce",
        "nickName": "Santa",
        "password": "puliscoCesso"
    },
    {
        "name": "Maurizio",
        "surname": "Pinna",
        "nickName": "Mauri",
        "password": "puliscoCucina"
    },
    {
        "name": "Lorenzo",
        "surname": "Meli",
        "nickName": "Lori",
        "password": "puliscoPavimento"
    }
];

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening at port: '+ port));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const databaseLogin = new Datastore({ filename: 'loginDatabase.db', autoload: true });
databaseLogin.loadDatabase();

const databaseTurniCucina = new Datastore({ filename: 'turniCucinaDatabase.db', autoload: true });
databaseTurniCucina.loadDatabase();

const databaseTurniCesso = new Datastore({ filename: 'turniCessoDatabase.db', autoload: true });
databaseTurniCesso.loadDatabase();

const databaseTurniPiattiTrio = new Datastore({ filename: 'turniPiattiTrioDatabase.db', autoload: true });
databaseTurniPiattiTrio.loadDatabase();

const databaseTurniPiattiSantaMauri = new Datastore({ filename: 'turniPiattiSantaMauriDatabase.db', autoload: true });
databaseTurniPiattiSantaMauri.loadDatabase();

const databaseTurniPiattiSantaLori = new Datastore({ filename: 'turniPiattiSantaLoriDatabase.db', autoload: true });
databaseTurniPiattiSantaLori.loadDatabase();

const databaseTurniPiattiMauriLori = new Datastore({ filename: 'turniPiattiLoriMauriDatabase.db', autoload: true });
databaseTurniPiattiMauriLori.loadDatabase();

app.get('/getTurni0', (request, response) => {
    databaseTurniCucina.find({}).sort({timeStamp: 1}).exec((err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})

app.post('/postTurni0', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    var date = new Date(parseInt(timestamp));
    request.body.date = date.toLocaleString();
    databaseTurniCucina.insert(request.body);
    response.end();
})

app.post('/postTurni1', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    databaseTurniCesso.insert(request.body);
    response.end();
})

app.get('/getTurni1', (request, response) => {
    databaseTurniCesso.find({},(err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})

app.post('/postTurni2', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    databaseTurniPiattiTrio.insert(request.body);
    response.end();
})

app.get('/getTurni2', (request, response) => {
    databaseTurniPiattiTrio.find({},(err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})

app.post('/postTurni3', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    databaseTurniPiattiSantaMauri.insert(request.body);
    response.end();
})

app.get('/getTurni3', (request, response) => {
    databaseTurniPiattiSantaMauri.find({},(err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})

app.post('/postTurni4', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    databaseTurniPiattiSantaLori.insert(request.body);
    response.end();
})

app.get('/getTurni4', (request, response) => {
    databaseTurniPiattiSantaLori.find({},(err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})

app.post('/postTurni5', (request, response) => {
    var nickname = request.body.nickname
    var timestamp = Date.now();
    request.body.timeStamp = timestamp;
    databaseTurniPiattiMauriLori.insert(request.body);
    response.end();
})

app.get('/getTurni5', (request, response) => {
    databaseTurniPiattiMauriLori.find({},(err, data) => {
        if (err) {
            response.end()
            return
        } else {
        response.json(data)}
    });
})



app.post('/loginRequest', (request, response) => {
    var timestamp = Date.now();
    const username = request.body.username;
    const password = request.body.password;
    request.body.timeStamp = timestamp;

    if (Coinqui) {
        for (var i in Coinqui){
            if (Coinqui[i].nickName.toLowerCase() == username.toLowerCase()){
                if (Coinqui[i].password == password){   
                    loggedIn = true;      
                    loggedUser = Coinqui[i].name + ' ' +Coinqui[i].surname;
                    loggedNickname = Coinqui[i].nickName;
                    response.json({status: "success", error: "null", loggeduser: loggedUser, loggednickname: loggedNickname });
                    databaseLogin.insert(request.body)
                    response.end();
                    return
                } else {
                    response.json({status: "failed", error: "password", loggeduser: null, loggednickname: null });
                    databaseLogin.insert(request.body)
                    response.end();
                    return
                }
            };
        };
        if (!loggedIn){
            response.json({status: "failed", error: "credentials", loggeduser: null, loggednickname: null });
                    databaseLogin.insert(request.body)
                    response.end();
                    return
        };
    }

})