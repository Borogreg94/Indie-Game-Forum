const fetch = require('node-fetch');
var sqlite = require('better-sqlite3');
var cache = new sqlite('./gameForum.db');
const apiInfo = require('./idgb_api')

const Search = {
  async getSearchResults(input) {
    try {
      const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Client-ID': `${apiInfo.client_id}`,
        'Authorization': `Bearer ${apiInfo.access_token}`,
        },
        body: `fields id, first_release_date, name, websites, summary; search "${input}"; where genres = [32]; limit 10;`,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
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
      const response = await fetch('https://api.igdb.com/v4/covers', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Client-ID': `${apiInfo.client_id}`,
        'Authorization': `Bearer ${apiInfo.access_token}`,
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
      const response = await fetch('https://api.igdb.com/v4/websites', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Client-ID': `${apiInfo.client_id}`,
        'Authorization': `Bearer ${apiInfo.access_token}`,
        },
        body: `fields url; where game=${newGame.id}; limit 1;`,
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

    if(row){
      const ratingObj = cache
      .prepare('SELECT AVG(rating) FROM ratings WHERE gameId=?')
      .get(id);

      row.rating = ratingObj['AVG(rating)']
    }
  
    return row;
  },
};

module.exports = Search;
