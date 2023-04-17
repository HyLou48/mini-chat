"use strict";
const Groupe = require("../models/groupe.model");

module.exports.addGroupe = (req, res) => {
	let { nomG, idMembreG, nomMembreG } = req.body;

	const dateG = new Date();

	const newGroupe = {
		nomG,
		idMembreG,
		nomMembreG,
		dateG,
	};

	Groupe.addGroupe(newGroupe, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllGroupe = (req, res) => {
	Groupe.getAllGroupe(req.params.idU, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdGroupe = (req, res) => {
	Groupe.getidGroupe(req.params.idGroupe, (err, resp) => {
		if (!err) {
			if (resp.length !== 0) {
				res.send(resp);
			} else {
				const messageREs = `Nous n'avons trouvé aucune groupe correspondante.`;
				res.send({ message: messageREs });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.searchGroupe = (req, res) => {
	const { val } = req.body;
	const valeur = { val };

	Groupe.searchGroupe(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateGroupe = (req, res) => {
	let { idMembreG, nomMembreG, nomG } = req.body;

	const updateGroupe = {
		idMembreG,
		nomMembreG,
		nomG,
	};
	Groupe.updateGroupe(updateGroupe, req.params.idGroupe, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.deleteGroupe = (req, res) => {
	Groupe.deleteGroupe(req.params.idGroupe, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
