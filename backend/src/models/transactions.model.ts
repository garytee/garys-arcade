import * as database from "../data/sharedData"
import * as helper from "../helpers/helper"
import * as fs from "fs"

const DB = database.sharedData()

/** To read from json file - could do something like this
const dbFile = "src/data/db.json"
let readDB: any = fs.readFileSync(dbFile)
let DB = JSON.parse(readDB)
 */

const getTransactions = () => {
  const transactions = DB.transactions
  /**  To write data to file - could do something like this
  let writeDB = JSON.stringify(DB)
  fs.writeFileSync(dbFile, writeDB)
  */
  return transactions
}

const getTransaction = (id: number) => {
  const transaction = DB.transactions.filter(
    (transaction: any) => transaction.id === id
  )
  if (transaction.length != 1) {
    throw Error(`transaction id '${id}' not found`)
  }
  return transaction[0]
}

const calcBalance = () => {
  let b = 0
  DB.transactions.forEach((transaction: any) => {
    if (transaction.type === "spend") {
      b -= transaction.tokens
    } else if (transaction.type === "purchase") {
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
