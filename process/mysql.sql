SELECT
    idG,
    nomG,
    idMembreG,
    nomMembreG,
    DATE_FORMAT(dateG, '%d-%m-%Y') as dateG
FROM
    Groupe
WHERE
    idMembreG LIKE '%4%'
ORDER BY
    idG DESC;
