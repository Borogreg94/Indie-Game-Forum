const fetch = require('node-fetch');
var sqlite = require('better-sqlite3');
var cache = new sqlite('./gameForum.db');

const Search = {
  async getSearchResults(input) {
    try {
      const response = await fetch('https://api-v3.igdb.com/games', {
        method: 'POST',
        headers: {
          'user-key': '86ba2db2c2d66cb6dd0d4a20a029b1fe',
          'Content-Type': 'application/json',
        },
        body: `fields id, first_release_date, name, websites, summary; search "${input}"; where genres = [32]; limit 10;`,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
      } else {
        throw new Error('Did not get response from API');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async addAllInfoToCache(newGame) {
    let newCover;
    let newWebsite;

    try {
      const response = await fetch('https://api-v3.igdb.com/covers', {
        method: 'POST',
        headers: {
          'user-key': '86ba2db2c2d66cb6dd0d4a20a029b1fe',
          'Content-Type': 'application/json',
        },
        body: `fields url; where game=${newGame.id}; limit 1;`,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const coverUrl = jsonResponse[0].url;
        //convert url to get larger image
        newCover = coverUrl.replace('t_thumb', 't_cover_big');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch('https://api-v3.igdb.com/websites', {
        method: 'POST',
        headers: {
          'user-key': '86ba2db2c2d66cb6dd0d4a20a029b1fe',
          'Content-Type': 'application/json',
        },
        body: `fields url; where game=${newGame.websites}; limit 1;`,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        newWebsite = jsonResponse[0].url;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }

    cache
      .prepare(
        `INSERT INTO gameCache (id, name, releaseDate, summary, cover, gameSite ) VALUES (?,?,?,?,?,?)`
      )
      .run(
        newGame.id,
        newGame.name,
        newGame.first_release_date,
        newGame.summary,
        newCover,
        newWebsite
      );
  },

  getObjectFromCache(id) {
    const row = cache.prepare(`SELECT * FROM gameCache WHERE id=?`).get(id);
    return row;
  },
};

module.exports = Search;
