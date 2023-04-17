let dbConn = require("../config/bdd");

let SmsPriver = function (smsPriver) {
	this.idMP = smsPriver.idMP;
	this.idU1 = smsPriver.idU1;
	this.idU2 = smsPriver.idU2;
	this.smsPriver = smsPriver.smsPriver;
	this.vu = smsPriver.vu;
	this.dateSMS = smsPriver.dateSMS;
};

const REQUETE_DE_BASE = `
SELECT
    idMP,
    idU1,
    idU2,
	smsPriver,
	vu,
    DATE_FORMAT(dateSMS, '%d-%m-%Y') as dateSMS
FROM
    SmsPriver
WHERE
	(
		idU1 = ?
		OR idU1 = ?
	)
	AND (
		idU2 = ?
		OR idU2 = ?
	)
ORDER BY
	idMp ASC `;

SmsPriver.addSmsPriver = (newSmsPriver, result) => {
	dbConn.query("INSERT INTO SmsPriver SET ?", newSmsPriver, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

SmsPriver.getAllSmsPriver = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE,
		[valeur.idU1, valeur.idU2, valeur.idU1, valeur.idU2],
		(err, res) => { 
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

SmsPriver.getIdSmsPriver = (idSmsPriver, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE idMP = ? `,
		idSmsPriver,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

SmsPriver.searchSmsPriver = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE + ` WHERE smsPriver LIKE '%${valeur.val}%'  `,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "Trouvé", success: true });
				} else {
					const messageREs =
						`Nous n'avons trouvé aucune message pour "` + valeur.val + `".`;
					result(null, { res, message: messageREs, success: false });
				}
			}
		}
	);
};

SmsPriver.updateSmsPriver = (updateSmsPriver, idSmsPriver, result) => {
	dbConn.query(
		`update SmsPriver set ? where idMP = ${idSmsPriver}`,
		updateSmsPriver,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

SmsPriver.deleteSmsPriver = (idSmsPriver, result) => {
	dbConn.query(
		`DELETE FROM SmsPriver WHERE idMP = ${idSmsPriver}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = SmsPriver;
