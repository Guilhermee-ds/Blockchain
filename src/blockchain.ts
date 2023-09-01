import { createHash } from "crypto";
import { hash } from "./helpers";

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
  #chain: Block[] = []
  private prefixoPow = '0' //init 0

  constructor(private readonly dificulty: number = 4) {
    this.#chain.push(this.createBlockGenesis())
  }


  private createBlockGenesis(): Block {
    const payload: Block['payload'] = {
      sequence: 0, // first block
      timestamp:  +new Date (), //data covert in number
      data: 'First block',
      hashPrevious: ''
    }

    return {
      header: {
        nonce:0,
        hashblock: hash(JSON.stringify(payload)),
      },
      payload

    }
  }

  private get lastBlock():Block{
    return this.#chain.at(-1) as Block //get last block
  }

  private hashLastBlock() {
    return this.lastBlock.header.hashblock
  }

  createBlock(data:any):Block['payload'] {
    const newBlock :Block['payload'] = {
      sequence: this.lastBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data: data,
      hashPrevious: this.hashLastBlock()
    }
    console.log(`Block #${newBlock.sequence} criado: ${JSON.stringify(newBlock)}`)
    return newBlock
  }
}
