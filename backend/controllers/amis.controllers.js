"use strict";
const Amis = require("../models/amis.model");

module.exports.addAmis = (req, res) => {
	let { nomU1, nomU2, idU1, idU2, photoU1, photoU2 } = req.body;

	const amitier = "0";
	const dateInvitation = new Date();

	const newAmis = {
		nomU1,
		nomU2,
		idU1,
		idU2,
		photoU1,
		photoU2,
		amitier,
		dateInvitation,
	};

	Amis.addAmis(newAmis, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllAmis = (req, res) => {
	Amis.getAllAmis(req.params.idAmis, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getAllInvitations = (req, res) => {
	Amis.getAllInvitations(req.params.idAmis, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdAmis = (req, res) => {
	Amis.getIdAmis(req.params.idAmis, (err, resp) => {
		if (!err) {
			if (resp.length !== 0) {
				res.send(resp);
			} else {
				const messageREs = `Nous n'avons pas trouvé l'identifiant de l'utilisateur en question.`;
				res.send({ message: messageREs });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.searchAmis = (req, res) => {
	const { nom } = req.body;
	const valeur = { nom };

	Amis.searchAmis(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateAmis = (req, res) => {
	let { amitier } = req.body;

	const updateAmis = {
		amitier,
	};
	Amis.updateAmis(updateAmis, req.params.idAmis, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.deleteAmis = (req, res) => {
	Amis.deleteAmis(req.params.idAmis, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
