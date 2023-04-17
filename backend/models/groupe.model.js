let dbConn = require("../config/bdd");

let Groupe = function (groupe) {
	this.idG = groupe.idG;
	this.nomG = groupe.nomG;
	this.idMembreG = groupe.idMembreG;
	this.nomMembreG = groupe.nomMembreG;
	this.dateG = groupe.dateG;
};

const REQUETE_DE_BASE = `
SELECT
    idG,
	nomG,
    idMembreG,
    nomMembreG,
    DATE_FORMAT(dateG, '%d-%m-%Y') as dateG
FROM
    Groupe `;

Groupe.addGroupe = (newGroupe, result) => {
	dbConn.query("INSERT INTO Groupe SET ?", newGroupe, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

Groupe.getAllGroupe = (idU, result) => {
	dbConn.query(REQUETE_DE_BASE + ` WHERE idMembreG LIKE '%${idU}%' ORDER BY idG DESC `, (err, res) => { 
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Groupe.getidGroupe = (idGroupe, result) => {
	dbConn.query(REQUETE_DE_BASE + ` WHERE idG = ? `, idGroupe, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Groupe.searchGroupe = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE nomG LIKE '%${valeur.val}%'  `,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "Trouvé", success: true });
				} else {
					const messageREs =
						`Nous n'avons trouvé aucune groupe à afficher pour ` + valeur.val;
					result(null, { res, message: messageREs, success: false });
				}
			}
		}
	);
};

Groupe.updateGroupe = (updateGroupe, idGroupe, result) => {
	dbConn.query(
		`update Groupe set ? where idG = ${idGroupe}`,
		updateGroupe,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Groupe.deleteGroupe = (idGroupe, result) => {
	dbConn.query(
		`DELETE FROM Groupe WHERE idG = ${idGroupe}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = Groupe;
