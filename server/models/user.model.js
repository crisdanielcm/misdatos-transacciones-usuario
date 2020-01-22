const sql = require('../database');

const User = function(user) {
    this.user_id = user.user_id;
    this.name = user.name;
    this.lastname = user.lastname;
    this.birth_date = user.birth_date;
    this.email = user.email;
    this.password = user.password;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    })
};

User.findByEmail = (userEmail, result) => {
    sql.query('SELECT * FROM users WHERE email = ?', userEmail, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, { response: true });
            return;
        }

        result(null, { response: false });
    })
}

module.exports = User;