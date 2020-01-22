const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).json({
            success: false,
            message: "Petición inválida!"
        });
        return;
    }
    if (!req.body.name) {
        res.status(400).json({
            success: false,
            message: "El campo nombre es obligatorio."
        });
        return;
    }
    if (!req.body.lastname) {
        res.status(400).json({
            success: false,
            message: "El campo apellido es obligatorio."
        });
        return;
    }
    if (!req.body.birth_date) {
        res.status(400).json({
            success: false,
            message: "El campo fecha de nacimiento es obligatorio."
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).json({
            success: false,
            message: "El campo correo electrónico es obligatorio."
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).json({
            success: false,
            message: "El campo contraseña es obligatorio."
        });
        return;
    }

    let email = req.body.email;
    User.findByEmail(email, (err, data) => {
        if (data) {
            if (!data.response) {
                const user = new User({
                    user_id: crypto.createHash('md5').update(email).digest("hex"),
                    name: req.body.name,
                    lastname: req.body.lastname,
                    birth_date: req.body.birth_date,
                    email: email,
                    password: bcrypt.hashSync(req.body.password, 10)
                });

                User.create(user, (err, data) => {
                    if (err)
                        res.status(200).json({
                            message: err.message || "Ocurrio un error mientras se creaba el usuario."
                        });
                    else res.send(data);
                });

            } else {
                res.status(200).json({
                    message: "Ya existe un usuario registrado con el email " + email
                });
            }
        }
    });


};