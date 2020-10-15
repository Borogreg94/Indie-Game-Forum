const Search = require('./Search');

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
