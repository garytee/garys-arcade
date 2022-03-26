import * as database from "../data/sharedData"
import * as helper from "../helpers/helper"

const DB = database.sharedData() // cant shared updates to this across files...

const getTransactions = () => {
  const transactions = DB.transactions
  return transactions
}

const getTransaction = (id: number) => {
  const transaction = DB.transactions.filter(
    (transaction) => transaction.id === id
  )
  if (transaction.length != 1) {
    throw Error(`transaction id '${id}' not found`)
  }
  return transaction[0]
}

const calcBalance = () => {
  let b = 0
  DB.transactions.forEach((transaction) => {
    if (transaction.type === "spend") {
      b -= transaction.tokens
    }
    else if (transaction.type === "purchase") {
      b += transaction.tokens
    }
  })
  let balance = { balance: b }
  console.log(balance)
  return balance
}

const insertTransaction = (newTransaction: any) => {
  newTransaction.id = helper.getNewId(DB.transactions)
  newTransaction.date = helper.newDate()

  DB.transactions.push(newTransaction)

  console.log(DB.transactions)
  return newTransaction
}

export { insertTransaction, getTransactions, getTransaction, calcBalance }
