"use strict";
const SmsPriver = require("../models/smsPriver.model");

module.exports.addSmsPriver = (req, res) => {
	let { smsPriver, idU1, idU2 } = req.body;

	const vu = "0";
	const dateSMS = new Date();

	const newSmsPriver = {
		smsPriver,
		idU1,
		idU2,
		vu,
		dateSMS,
	};

	SmsPriver.addSmsPriver(newSmsPriver, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllSmsPriver = (req, res) => {
	const { idU1, idU2 } = req.body;
	const valeur = { idU1, idU2 }; 

	SmsPriver.getAllSmsPriver(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdSmsPriver = (req, res) => {
	SmsPriver.getIdSmsPriver(req.params.idSmsPriver, (err, resp) => {
		if (!err) {
			if (resp.length !== 0) {
				res.send(resp);
			} else {
				const messageREs = `Nous n'avons pas trouvé le message de l'utilisateur en question.`;
				res.send({ message: messageREs });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.searchSmsPriver = (req, res) => {
	const { val } = req.body;
	const valeur = { val };

	SmsPriver.searchSmsPriver(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateSmsPriver = (req, res) => {
	let { vu } = req.body;

	const updateSmsPriver = {
		vu,
	};
	SmsPriver.updateSmsPriver(
		updateSmsPriver,
		req.params.idSmsPriver,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};

module.exports.deleteSmsPriver = (req, res) => {
	SmsPriver.deleteSmsPriver(req.params.idSmsPriver, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
