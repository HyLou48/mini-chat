"use strict";
const Utilisateur = require("../models/utilisateur.model");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (numCompte) => {
	return jwt.sign({ numCompte }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

const storageFace = multer.diskStorage({
	destination: path.join(
		__dirname,
		process.env.PATH_PIC,
		process.env.PATH_PIC_PDP
	),
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

module.exports.addUtilisateur = (req, res) => {
	let { nom, prenom, mail, mdp } = req.body;

	mdp = bcrypt.hashSync(mdp, 10);
	const photo = "Aucune";
	const dateU = new Date();

	const newUtilisateur = {
		nom,
		prenom,
		mail,
		mdp,
		photo,
		dateU,
	};

	Utilisateur.addUtilisateur(newUtilisateur, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.addPhotoPdp = (req, res) => {
	try {
		// 'avatar' is the name of our file input field in the HTML form
		let upload = multer({ storage: storageFace }).single("photo");

		upload(req, res, function (err) {
			if (!req.file) {
				return res.send("Selectioner une image à enregistrer.");
			} else if (err instanceof multer.MulterError) {
				return res.send(err);
			} else if (err) {
				return res.send(err);
			}

			const classifiedsadd = {
				photo: req.file.filename,
			};

			Utilisateur.updateUtilisateur(
				classifiedsadd,
				req.params.id,
				(err, resp) => {
					if (err) {
						res.send(err);
					} else {
						res.send(resp);
					}
				}
			);
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.loginUtilisateur = (req, res) => {
	let { mail, mdp } = req.body;

	Utilisateur.loginUtilisateur({ mail }, (err, resp) => {
		if (!err) {
			if (resp.length != 0) {
				const pwd = resp[0].mdp;
				const validePwd = bcrypt.compareSync(mdp, pwd);

				if (validePwd) {
					const token = createToken(resp);
					res.send({ success: true, token, user: resp });
				} else {
					res.send({ success: false });
				}
			} else {
				res.send({ success: false });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.getAllUtilisateurs = (req, res) => {
	Utilisateur.getAllUtilisateurs((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdUtilisateur = (req, res) => {
	Utilisateur.getIdUtilisateur(req.params.idUtilisateur, (err, resp) => {
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

module.exports.getLastNumeroCompteUtilisateur = (req, res) => {
	Utilisateur.getLastNumeroCompteUtilisateur((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.searchUtilisateur = (req, res) => {
	const { nom } = req.body;
	const valeur = { nom };

	Utilisateur.searchUtilisateur(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateUtilisateur = (req, res) => {
	let { nom, prenom, mail, mdp, photo } = req.body;

	mdp = bcrypt.hashSync(mdp, 10);

	const updateUtilisateur = {
		nom,
		prenom,
		mail,
		mdp,
		photo,
	};
	Utilisateur.updateUtilisateur(
		updateUtilisateur,
		req.params.idUtilisateur,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};

module.exports.deleteUtilisateur = (req, res) => {
	Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
