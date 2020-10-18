const express = require('express');
const server = express();
const cors = require('cors');

var sqlite = require('better-sqlite3');
var cache = new sqlite('./gameForum.db');

const Search = require('./Search.js');
const Users = require('./Users.js');

const PORT = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());

server.get('/search/:input', async (req, res, next) => {
  const resultsArray = await Search.getSearchResults(req.params.input);

  for (let i = 0; i < resultsArray.length; i++) {
    const fromCache = Search.getObjectFromCache(resultsArray[i].id);

    if (fromCache) {
      resultsArray[i] = fromCache;
    } else {
      await Search.addAllInfoToCache(resultsArray[i]);
      resultsArray[i] = Search.getObjectFromCache(resultsArray[i].id);
    }
  }

  res.send(JSON.stringify(resultsArray));
});

server.post('/createUser', (req, res, next) => {
  const result = Users.addNewUser(
    req.body.username,
    req.body.password,
    req.connection.remoteAddress
  );

  if (result) {
    const id_name = Users.logIn(req.body.username, req.body.password);

    res.send(JSON.stringify(id_name));
  } else {
    res.send(JSON.stringify(false));
  }
});

server.post('/logIn', (req, res, next) => {
  const id_name = Users.logIn(req.body.username, req.body.password);

  if (id_name) {
    res.send(JSON.stringify(id_name));
  } else {
    res.send(JSON.stringify(false));
  }
});

server.get('/getCard/:id', (req, res, next) => {
  const card = Search.getObjectFromCache(req.params.id);
  res.send(JSON.stringify(card));
});

server.get('/getComments/:id', (req, res, next) => {
  const commentList = cache
    .prepare(`SELECT * FROM comments WHERE gameId=?`)
    .all(req.params.id);

  res.send(JSON.stringify(commentList));
});

server.post('/addComment', (req, res, next) => {
  cache
    .prepare(
      `INSERT INTO comments (gameId, username, text, time) VALUES (?,?,?,?)`
    )
    .run(req.body.gameId, req.body.username, req.body.comment, req.body.time);

  const commentList = cache
    .prepare(`SELECT * FROM comments WHERE gameId=?`)
    .all(req.body.gameId);

  res.send(JSON.stringify(commentList));
});

server.post('/addRating', (req, res, next) => {
  const row = cache
    .prepare(`SELECT * FROM ratings WHERE gameId=? AND username=?`)
    .get(req.body.gameId, req.body.username);

  if (row) {
    cache
      .prepare(`UPDATE ratings SET rating=? WHERE gameId=? AND username=?`)
      .run(req.body.rating, req.body.gameId, req.body.username);
  } else {
    cache
      .prepare(`INSERT INTO ratings (gameId, username, rating) VALUES (?,?,?)`)
      .run(req.body.gameId, req.body.username, req.body.rating);
  }

  res.send(JSON.stringify({ personalRating: req.body.rating }));
});

server.get('/getPersonalRating/:username/:gameId', (req, res, next) => {
  const row = cache
    .prepare(`SELECT * FROM ratings WHERE username=? AND gameId=?`)
    .get(req.params.username, req.params.gameId);

  if (row) {
    res.send(
      JSON.stringify({
        personalRating: row.rating,
        ratingTitle: 'Your Rating',
      })
    );
  } else {
    res.send(
      JSON.stringify({
        personalRating: null,
        ratingTitle: 'Rate',
      })
    );
  }
});

server.get('/getAverageRating/:id', (req, res, next) => {
  const avgVal = cache
    .prepare('SELECT AVG(rating) FROM ratings WHERE gameId=?')
    .get(req.params.id);

  if (avgVal) {
    res.send(JSON.stringify({ avg: avgVal['AVG(rating)'] }));
  } else {
    res.send(JSON.stringify(null));
  }
});

server.get('/getCardFav/:username/:gameId', (req, res, next) => {
  const row = cache
    .prepare('SELECT * FROM favs WHERE username=? AND gameId=?')
    .get(req.params.username, req.params.gameId);

  if (row) {
    res.send(JSON.stringify({ heartFill: true }));
  } else {
    res.send(JSON.stringify({ heartFill: false }));
  }
});

server.post('/add_remove_fav', (req, res, next) => {
  const row = cache
    .prepare(`SELECT * FROM favs WHERE username=? AND gameId=?`)
    .get(req.body.username, req.body.gameId);

  if (row) {
    cache
      .prepare(`DELETE FROM favs WHERE username=? AND gameId=?`)
      .run(req.body.username, req.body.gameId);

    res.send(JSON.stringify({ heartFill: false }));
  } else {
    cache
      .prepare(`INSERT INTO favs (username, gameId) VALUES (?, ?)`)
      .run(req.body.username, req.body.gameId);

    res.send(JSON.stringify({ heartFill: true }));
  }
});

server.get('/getFavsList/:username', (req, res, next) => {
  const gameIdList = cache
    .prepare('SELECT gameId FROM favs WHERE username=?')
    .all(req.params.username);

  let favList = [];

  for (var i = 0; i < gameIdList.length; i++) {
    const game = cache
      .prepare('SELECT * FROM gameCache WHERE id=?')
      .get(gameIdList[i].gameId);

    favList.push(game);
  }

  res.send(JSON.stringify({ favList }));
});

server.get('/getTopRatedGames', (req, res, next) => {
  const idList = cache
    .prepare('SELECT gameId, AVG(rating) FROM ratings GROUP BY gameID ORDER BY rating DESC LIMIT 10')
    .all();

    idList.sort((a, b) => {
      return ('' + a['AVG(rating)']).localeCompare('' + b['AVG(rating)']);
    });

    idList.reverse() 

  let searchResults = [];

  for (var i = 0; i < idList.length; i++) {
    const game = Search.getObjectFromCache(idList[i].gameId)
    searchResults.push(game);
  }
  res.send(JSON.stringify(searchResults));
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
