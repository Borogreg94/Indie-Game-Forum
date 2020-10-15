const sqlite3 = require('sqlite3');
const cache = new sqlite3.Database('./gameCache.db');

const test = (id, url) => {
  cache.get(`SELECT * FROM gameCache WHERE id=${id}`, (error, row) => {
    if (row) {
      cache.run(`UPDATE gameCache SET cover = "${url}" WHERE id = ${id}`);
    } else {
      cache.run(`INSERT INTO gameCache (cover, id) VALUES ("${url}", ${id})`);
    }
  });
};

test(2, 'abcdefg');
