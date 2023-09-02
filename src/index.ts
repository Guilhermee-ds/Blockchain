import { Console } from "console"
import {Blockchain} from './blockchain'

const dificulty = Number(process.argv[2]) || 4
const blockchain = new Blockchain(dificulty)

const numBlocks = Number(process.argv[3]) || 10
let chain = blockchain.chain

for (let i =1; i < numBlocks; i++) {
  const block = blockchain.createBlock( `block ${i}` )
  const mineInfo = blockchain.blockMiner(block)
  chain = blockchain.sendBlock(mineInfo.blockMiner)
}

console.log('-- BLOCKCHAIN --')

console.log(chain)
