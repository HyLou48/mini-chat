export default function getDataUtilisateur() {
	const u_info = {
		u_token: localStorage.token,
		u_idU: localStorage.idU,
		u_photo: localStorage.photo,
		u_nom: localStorage.nom,
		u_prenom: localStorage.prenom,
		u_identification: localStorage.mail,
		u_dateU: localStorage.dateU,
	};

	const headOpts = {
		opts: {
			headers: {
				Authorization: u_info.u_token,
			},
		},
	};

	let u_data = Object.assign({}, u_info);
	u_data = Object.assign(u_data, headOpts);

	return u_data;
}
