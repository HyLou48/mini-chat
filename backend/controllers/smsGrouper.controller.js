"use strict";
const SmsGrouper = require("../models/smsGrouper.model");

module.exports.addSmsGrouper = (req, res) => {
	let { idU1, nomU1, smsGrouper, idG } = req.body;

	const dateMessage = new Date();

	const newSmsGrouper = {
		idU1,
		nomU1,
		smsGrouper,
		dateMessage,
		idG,
	};

	SmsGrouper.addSmsGrouper(newSmsGrouper, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllSmsGrouper = (req, res) => {
	const { idG } = req.body;
	const valeur = { idG }; 

	SmsGrouper.getAllSmsGrouper(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdSmsGrouper = (req, res) => {
	SmsGrouper.getIdSmsGrouper(req.params.idSmsGrouper, (err, resp) => {
		if (!err) {
			if (resp.length !== 0) {
				res.send(resp);
			} else {
				const messageREs = `Nous n'avons pas trouvé le message dans le groupe de l'utilisateur en question.`;
				res.send({ message: messageREs });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.searchSmsGrouper = (req, res) => {
	const { val } = req.body;
	const valeur = { val };

	SmsGrouper.searchSmsGrouper(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateSmsGrouper = (req, res) => {
	let { idUGroupLu, nomGroupLu } = req.body;

	const updateSmsGrouper = {
		idUGroupLu,
		nomGroupLu,
	};
	SmsGrouper.updateSmsGrouper(
		updateSmsGrouper,
		req.params.idSmsGrouper,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};

module.exports.deleteSmsGrouper = (req, res) => {
	SmsGrouper.deleteSmsGrouper(req.params.idSmsGrouper, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
