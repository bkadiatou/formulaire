const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// affichage du formulaire
app.get('/', (req, res) => {
    res.render('form');
});

//  traitement des données du formulaire
app.post('/submit', (req, res) => {
    // Récupération des données du formulaire
    const { login, password, nom, prenom, photo } = req.body;

    // pour stocker les données dans un tableau 
    const information = { login, password, nom, prenom, photo };
    informations.push(information);

    // Rediriger vers la page avec le tableau des informations
    res.redirect('/list');
});

//  affichage du tableau des informations
app.get('/list', (req, res) => {
    res.render('list', { informations });
});
// app.js

// ...
const informations = [];


app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const info = informations[index];
    res.render('form', { editInfo: info, index });
});

app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    const { login, password, nom, prenom, photo } = req.body;
    informations[index] = { login, password, nom, prenom, photo };
    res.redirect('/list');
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.index;
    informations.splice(index, 1);
    res.redirect('/list');
});

// ...

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
