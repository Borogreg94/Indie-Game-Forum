var sqlite = require('better-sqlite3');
var db = new sqlite('./gameForum.db');

const Users = {
  createGuid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + '000000000').substr(2, 8);
      return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  },

  addNewUser(username, password, remoteAddress) {
    const statement = db.prepare(`SELECT * FROM users WHERE username=?`);
    const row = statement.get(username);

    if (!row) {
      const newUserId = this.createGuid();

      db.prepare(
        `INSERT INTO users (id, username, password, ip) VALUES (?, ?, ?, ?)`
      ).run(newUserId, username, password, remoteAddress);

      return true;
    } else {
      return false;
    }
  },

  logIn(username, password) {
    const row = db
      .prepare(`SELECT * FROM users WHERE username=? AND password=?`)
      .get(username, password);

    if (row) {
      return { id: row.id, username: row.username };
    } else {
      return false;
    }
  },
};

module.exports = Users;
