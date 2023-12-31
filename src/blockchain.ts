import { createHash } from "crypto";
import { hash, validHash } from "./helpers";

export interface Block {
  // pt-br = informação meta dado do bloco.
  //en = block meta data information.
  header: {
    nonce: number;
    hashblock: string;
  }
  // pt-br = aqui é aonde calculamos os dados como sequencia, timestamp, dados e HashAnterior.
  //en = this is where we calculate the data such as sequence, timestamp, data and Previuos hash.
  payload: {
    sequence: number;
    timestamp: number;
    data: any;
    hashPrevious: string;
  }
}

export class Blockchain {
  mineBlocks(block: { sequence: number; timestamp: number; data: any; hashPrevious: string; }) {
    throw new Error("Method not implemented.");
  }
  #chain: Block[] = []
  private prefixoPow = '0' //init 0

  constructor(private readonly dificulty: number = 4) {
    this.#chain.push(this.createBlockGenesis())
  }


  private createBlockGenesis(): Block {
    const payload: Block['payload'] = {
      sequence: 0, // first block
      timestamp: +new Date(), //data covert in number
      data: 'First block',
      hashPrevious: ''
    }

    return {
      header: {
        nonce: 0,
        hashblock: hash(JSON.stringify(payload)),
      },
      payload

    }
  }

  get chain () {
    return this.#chain
  }

  private get lastBlock(): Block {
    return this.#chain.at(-1) as Block //get last block
  }

  private hashLastBlock() {
    return this.lastBlock.header.hashblock
  }

  createBlock(data: any): Block['payload'] {
    const newBlock: Block['payload'] = {
      sequence: this.lastBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data: data,
      hashPrevious: this.hashLastBlock()
    }
    console.log(`Block #${newBlock.sequence} criado: ${JSON.stringify(newBlock)}`)
    return newBlock
  }

  blockMiner(block: Block['payload']) {
    let nonce = 0
    let start = +new Date()
    while (true) {

      const hashBlock = hash(JSON.stringify(block))
      const hashPow = hash(hashBlock + nonce)

      if (validHash({
        hash: hashPow,
        dificulty: this.dificulty,
        prefixo: this.prefixoPow
      })) {
        const end = +new Date()
        const hashReduced = hashBlock.slice(0, 12)
        const timeMinered = (end - start) / 100

        console.log(`Block #${block.sequence} minered in ${timeMinered}s. 
      Hash ${hashReduced} (${nonce} tentatives)`)

        return {
          blockMiner: {
            payload: { ...block },
            header: {
              nonce,
              hashblock : hashBlock
            }
          }
        }
      }

      nonce++
    }
  }

  verifyBlock(block: Block): boolean {
    if (block.payload.hashPrevious !== this.hashLastBlock()) {
      console.error(`Block #${block.payload.sequence} invalid: the previous hash 
      is ${this.hashLastBlock().slice(0,12)} not ${block.payload.hashPrevious.slice(0,12)}`)
      return false
    }
    const hashTest = hash(hash(JSON.stringify(block.payload)) +
      block.header.nonce)
    if (!validHash({ 
      hash: hashTest, 
      dificulty: this.dificulty, 
      prefixo: this.prefixoPow })) {
      console.error(`Block #${block.payload.sequence} invalid:
       Nonce ${block.header.nonce} is invalid and cannot be verified`)
      return false
    }
    return true
  }

   sendBlock(block : Block): Block[] {
     if (this.verifyBlock(block)) {
       this.#chain.push(block)
       console.log(`Block #${ block.payload.sequence } was added to blockchain:
       ${JSON.stringify(block, null,2)}`) // print block ad
     }
     return this.#chain
   }
}
