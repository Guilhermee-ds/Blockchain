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