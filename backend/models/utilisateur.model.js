let dbConn = require("../config/bdd");

let Utilisateur = function (utilisateur) {
	this.idU = utilisateur.idU;
	this.mail = utilisateur.mail;
	this.nom = utilisateur.nom;
	this.prenom = utilisateur.prenom;
	this.photo = utilisateur.photo;
	this.mdp = utilisateur.mdp;
	this.dateU = utilisateur.dateU;
};

const REQUETE_DE_BASE = `
SELECT
    idU,
	mail,
    nom,
    prenom,
    photo,
    mdp,
    DATE_FORMAT(dateU, '%d-%m-%Y') as dateU
FROM
    UTILISATEUR `;

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
	dbConn.query("INSERT INTO UTILISATEUR SET ?", newUtilisateur, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

Utilisateur.loginUtilisateur = (values, result) => {
	const requete = ` WHERE mail=?`;
	dbConn.query(
		REQUETE_DE_BASE + requete,
		[values.mail, values.mdp],
		(err, res) => {
			if (!err) {
				result(null, res);
			} else {
				result(err, null);
			}
		}
	);
};

Utilisateur.getAllUtilisateurs = (result) => {
	dbConn.query(REQUETE_DE_BASE + ` ORDER BY idU DESC `, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Utilisateur.getIdUtilisateur = (idUtilisateur, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE idU = ? `,
		idUtilisateur,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Utilisateur.getLastNumeroCompteUtilisateur = (result) => {
	dbConn.query(
		`SELECT idU FROM utilisateur ORDER BY idU DESC LIMIT 1 `,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				let id = 0;
				if (res.length === 0) {
					id = 1;
				} else {
					const tmpID = Object.values(res);
					id = Object.values(tmpID[0]);
					id = id[0] + 1;
				}
				result(null, { numeroCompte: id });
			}
		}
	);
};

Utilisateur.searchUtilisateur = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE +
			` WHERE (nom LIKE '%${valeur.nom}%' OR prenom LIKE '%${valeur.nom}%') `,
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

Utilisateur.updateUtilisateur = (updateUtilisateur, idUtilisateur, result) => {
	console.log(idUtilisateur);
	dbConn.query(
		`update UTILISATEUR set ? where idU = ${idUtilisateur}`,
		updateUtilisateur,
		function (err, res) {
			console.log(err, res);
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Utilisateur.deleteUtilisateur = (idUtilisateur, result) => {
	dbConn.query(
		`DELETE FROM UTILISATEUR WHERE idU = ${idUtilisateur}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = Utilisateur;
