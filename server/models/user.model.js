const sql = require('../database');

const User = function(user) {
    this.user_id = user.user_id;
    this.name = user.name;
    this.lastname = user.lastname;
    this.birth_date = user.birth_date;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { message: "Usuario creado correctamente", newUser });
    })
};

User.findByEmail = (userEmail, result) => {
    sql.query("SELECT * FROM users WHERE email = ?", userEmail, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, { response: true });
            return;
        }
        result(null, { response: false });
    });
}

User.getTransactionHistory = (user_id, result) => {
    sql.query('SELECT * FROM users u JOIN transactions t on u.user_id = t.user_id WHERE t.user_id = ?', user_id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length > 0) {
            result(null, { history: res });
            return;
        }
        result(null, { response: "No se encontraron resultados" });
    });
}

User.getPoints = (user_id, result) => {
    sql.query('SELECT SUM(t.points) as points FROM users u JOIN transactions t ON u.user_id = t.user_id WHERE t.status = ? AND t.user_id = ?', [1, user_id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length > 0) {
            result(null, { points: res });
            return;
        }
        result(null, { response: "No se encontraron resultados" });
    });
}
module.exports = User;