const sharedData = () => {
  return {
    transactions: [
      {
        id: 1,
        type: "purchase",
        description: "16 Tokens Purchased",
        tokens: 16,
        date: "Wed Mar 25 2022 20:26:35 GMT-0400 (Eastern Daylight Time)",
      },
      {
        id: 2,
        type: "spend",
        description: "Played The Simpsons",
        tokens: 8,
        date: "Wed Mar 25 2022 20:26:35 GMT-0400 (Eastern Daylight Time)",
      },
    ],
    games: [
      { id: 1, name: "Galaga", tokens: 2 },
      { id: 2, name: "Pac-Man", tokens: 4 },
      { id: 3, name: "The Simpsons", tokens: 8 },
    ],
  }
}

export { sharedData }
