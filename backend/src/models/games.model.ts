import * as database from '../data/sharedData';

const getGames = () => {
  return database.sharedData().games;
}

const getGame = (id: number) => {

  const game = database.sharedData().games.filter(g => g.id === id);
  if (game.length != 1) {
      throw Error(`transaction id '${id}' not found`);
  }
  return game[0];

}


export {
  getGames,
  getGame
}
