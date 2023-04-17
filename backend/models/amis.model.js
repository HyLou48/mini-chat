let dbConn = require("../config/bdd");

let Amis = function (amis) {
	this.idA = amis.idA;
	this.idU1 = amis.idU1;
	this.idU2 = amis.idU2;
	this.nomU1 = amis.nomU1;
	this.nomU2 = amis.nomU2;
	this.photoU2 = amis.photoU2;
	this.amitier = amis.amitier;
	this.dateInvitation = amis.dateInvitation;
};

const REQUETE_DE_BASE = `
SELECT
    idA,
    idU1,
    idU2,
    nomU1,
    nomU2,
	photoU1,
	photoU2,
    amitier,
    DATE_FORMAT(dateInvitation, '%d-%m-%Y') as dateInvitation
FROM
    amis `;

Amis.addAmis = (newAmis, result) => {
	dbConn.query("INSERT INTO Amis SET ?", newAmis, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

Amis.getAllAmis = (idAmis, result) => {
	dbConn.query(REQUETE_DE_BASE + ` WHERE amitier = 1 AND (idU1 = ? OR idU2 = ?) ORDER BY idA DESC `, [idAmis, idAmis], (err, res) => {
		if (err) {
			result(err, null);
		} else { 
			result(null, res);
		}
	});
};

Amis.getAllInvitations = (idAmis, result) => {
	dbConn.query(REQUETE_DE_BASE + ` WHERE amitier = 0 AND idU2 = ? ORDER BY idA DESC `, idAmis, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Amis.getIdAmis = (idAmis, result) => {
	dbConn.query(REQUETE_DE_BASE + ` WHERE idA = ? `, idAmis, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Amis.searchAmis = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE +
			` WHERE nomU2 LIKE '%${valeur.nom}%'  `,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "Trouvé", success: true });
				} else {
					const messageREs =
						`Nous n'avons trouvé personne à afficher pour ` + valeur.nom;
					result(null, { res, message: messageREs, success: false });
				}
			}
		}
	);
};

Amis.updateAmis = (updateAmis, idAmis, result) => {
	dbConn.query(
		`update Amis set ? where idA = ${idAmis}`,
		updateAmis,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Amis.deleteAmis = (idAmis, result) => {
	dbConn.query(`DELETE FROM Amis WHERE idA = ${idAmis}`, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

module.exports = Amis;
