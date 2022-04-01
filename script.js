let motDecompose;
let grille = [];
let tour = 0;

//fonction qui crée la grille et marque la case centrale en rouge
function creationGrille() {
    //la fonction créé la grille. Elle créé les lignes puis les cases dans les lignes
    let idCadre = document.getElementById('cadre')
    for (let i = 0; i <= 14; i++) {
        let nvldiv = document.createElement('div');
        idCadre.append(nvldiv);
        nvldiv.classList.add("ligne");
        nvldiv.setAttribute("id", i)

        for (let j = 0; j <= 14; j++) {
            let carre = document.createElement('div');
            nvldiv.append(carre);
            carre.classList.add("case");
            carre.setAttribute("id", i + "-" + j)
            let idCase = carre.getAttribute("id");
            let coordonneesCase = document.createTextNode(idCase);
            carre.appendChild(coordonneesCase);
            grille.push({'X': j, 'Y': i, 'occupe': false})
        }
    }
    let caseCentrale = document.getElementById('7-7');
    caseCentrale.classList.add("caseCentrale");
}


creationGrille()
affichageChoixCoordonnee();
let boutonValidMot = document.getElementById('validationMot');
boutonValidMot.addEventListener('click', recupMot);


function recupMot() {
    //la fonction recupere le mot saisi dans l'input en le divise par lettre
    let mot = document.getElementById('mot').value;
    if (mot.length > 15) {
        alert('Le mot saisi fait plus de 15 caractères')
    } else {
        motDecompose = mot.split('');
        return motDecompose;
    }
}


function affichageChoixCoordonnee() {
    //la fonction affiche le choix de coordonnées dans le select
    let selectX = document.getElementById('coordonnee_x');
    for (let i = 0; i < 15; i++) {
        let element = document.createElement("option");
        element.textContent = i;
        element.value = i;
        selectX.appendChild(element);
    }
    let selectY = document.getElementById('coordonnee_y');
    for (let i = 0; i < 15; i++) {
        let element = document.createElement("option");
        element.textContent = i;
        element.value = i;
        selectY.appendChild(element);
    }
}

let boutonPlacement = document.getElementById('choixCase');
boutonPlacement.addEventListener('click', placementMot);

function placementMot() {
    //verif que le mot a bien était validé
    if (motDecompose === undefined) {
        alert("Veuillez valider le choix d'un mot");
    } else {
        //recuperation de la case par son id avec les coordonnees choisies
        let coordonneeX = parseInt(document.getElementById('coordonnee_x').value);
        let coordonneeY = parseInt(document.getElementById('coordonnee_y').value);
        let coordonnesCaseChoisie = coordonneeY + "-" + coordonneeX;
        let caseChoisie = document.getElementById(coordonnesCaseChoisie);
        let choixDirection = document.getElementById('choixDirection').value;
        //verif qu'au premier tour le mot a une lettre dans la case centrale
        if (tour === 0) {
            if (verifPremierTour(coordonneeX, coordonneeY, choixDirection)) {
                ecritureMot(coordonneeX, coordonneeY, choixDirection, caseChoisie, coordonnesCaseChoisie);
            } else {
                alert("Au premier tour le mot doit avoir une lettre sur la case centrale")
            }
        } else {
            //verif que le mot rentre de le cadre en recuperant la direction je vais verifier que le X ou le Y ne depasse pas 14
            //si c'est bon le mot s'écrie dans les cases
            if (verifCaseOccupee(coordonneeX, coordonneeY, choixDirection) === true) {
                alert('une case séléctionnée est occupée')
            } else {
                ecritureMot(coordonneeX, coordonneeY, choixDirection, caseChoisie);
            }
        }
    }
}


function verifPremierTour(coordonneeX, coordonneeY, choixDirection) {
    //la fonction vérifie que le mot a bien une lettre dans la case centrale
    let idCasesMot = []
    if (choixDirection === 'droite') {
        for (let i = 0; i < motDecompose.length - 1; i++) {
            coordonneeX += i;
            idCasesMot.push({'X': coordonneeX, 'Y': coordonneeY});
        }
    } else if (choixDirection === 'bas') {
        for (let i = 0; i < motDecompose.length - 1; i++) {
            coordonneeY += i;
            idCasesMot.push({'X': coordonneeX, 'Y': coordonneeY});
        }
    }
    if (idCasesMot.find(element => element.X === 7 && element.Y === 7) !== undefined) {
        return true
    }
}

function ecritureMot(coordonneeX, coordonneeY, choixDirection, caseChoisie) {
    //la fonction vérifie que le mot rentre dans la grille puis le fait apparaitre dans la grille dans le sens choisi
    if (choixDirection === 'droite') {
        let coordonneeXFin = coordonneeX + motDecompose.length;
        if (coordonneeXFin > 14) {
            alert('le mot ne rentre pas dans la grille')
        } else {
            for (let i = 0; i <= motDecompose.length - 1; i++) {
                coordonneeXFin = 0;
                caseChoisie.setAttribute('class', 'caseOccupee');
                let position = grille.find(element => element.X == coordonneeX && element.Y == coordonneeY);
                position.occupe = true;
                caseChoisie.innerHTML = motDecompose[i];
                coordonneeX++;
                tour++;
                let coordonnesCaseChoisie = coordonneeY + "-" + coordonneeX;
                caseChoisie = document.getElementById(coordonnesCaseChoisie);
            }
        }
    } else if (choixDirection === 'bas') {
        let coordonneeYFin = coordonneeY + motDecompose.length;
        if (coordonneeYFin > 14) {
            alert('le mot ne rentre pas dans la grille')
        } else {
            for (let i = 0; i <= motDecompose.length - 1; i++) {
                coordonneeYFin = 0;
                caseChoisie.setAttribute('class', 'caseOccupee');
                let position = grille.find(element => element.X == coordonneeX && element.Y == coordonneeY);
                position.occupe = true;
                caseChoisie.innerHTML = motDecompose[i];
                coordonneeY++;
                tour++;
                let coordonnesCaseChoisie = coordonneeY + "-" + coordonneeX;
                caseChoisie = document.getElementById(coordonnesCaseChoisie);
            }
        }
    } else {
        alert("la direction indiquée n'est pas valable")
    }
}

function verifCaseOccupee(coordonneeX, coordonneeY, choixDirection) {
    //la fonction vérifie qu'aucune case selectionnée n'est occupée
    let idCasesMot = [];
    if (choixDirection === 'droite') {
        for (let i = 0; i < motDecompose.length - 1; i++) {
            coordonneeX += i;
            idCasesMot.push({'X': coordonneeX, 'Y': coordonneeY});
        }
    } else if (choixDirection === 'bas') {
        for (let i = 0; i < motDecompose.length - 1; i++) {
            coordonneeY += i;
            idCasesMot.push({'X': coordonneeX, 'Y': coordonneeY});
        }
    }
    for (let j = 0; j < idCasesMot.length; j++) {
        let caseSelectionnee = grille.find(element => element.X === idCasesMot[j].X && element.Y === idCasesMot[j].Y);
        if (caseSelectionnee.occupe === true) {
            return true
        }
    }
}