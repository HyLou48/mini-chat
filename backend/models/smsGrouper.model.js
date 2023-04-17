let dbConn = require("../config/bdd");

let SmsGrouper = function (smsGrouper) {
	this.idMG = smsGrouper.idMG;
	this.idU1 = smsGrouper.idU1;
	this.idG = smsGrouper.idG;
	this.idUGroupLu = smsGrouper.idUGroupLu;
	this.nomU1 = smsGrouper.nomU1;
	this.nomGroupLu = smsGrouper.nomGroupLu;
	this.smsGrouper = smsGrouper.smsGrouper;
	this.dateMessage = smsGrouper.dateMessage;
};

const REQUETE_DE_BASE = `
SELECT
    idMG,
    idU1,
    idUGroupLu,
    nomU1,
    nomGroupLu,
    smsGrouper,
    DATE_FORMAT(dateMessage, '%d-%m-%Y') as dateMessage
FROM
    SmsGrouper `;

SmsGrouper.addSmsGrouper = (newSmsGrouper, result) => {
	dbConn.query("INSERT INTO SmsGrouper SET ?", newSmsGrouper, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

SmsGrouper.getAllSmsGrouper = (valeur, result) => {

	dbConn.query(REQUETE_DE_BASE + ` WHERE idG = ? ORDER BY idMG ASC `,[valeur.idG], (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SmsGrouper.getIdSmsGrouper = (idSmsGrouper, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE idMG = ? `,
		idSmsGrouper,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

SmsGrouper.searchSmsGrouper = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE smsGrouper LIKE '%${valeur.val}%'  `,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "Trouvé", success: true });
				} else {
					const messageREs =
						`Nous n'avons trouvé personne à afficher pour ` + valeur.val;
					result(null, { res, message: messageREs, success: false });
				}
			}
		}
	);
};

SmsGrouper.updateSmsGrouper = (updateSmsGrouper, idSmsGrouper, result) => {
	dbConn.query(
		`update SmsGrouper set ? where idMG = ${idSmsGrouper}`,
		updateSmsGrouper,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

SmsGrouper.deleteSmsGrouper = (idSmsGrouper, result) => {
	dbConn.query(
		`DELETE FROM SmsGrouper WHERE idMG = ${idSmsGrouper}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = SmsGrouper;
