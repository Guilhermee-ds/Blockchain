export interface Block {
  header: {
    nonce: number;
    hasblock: string;
  }
  payload: {
    sequence: number;
    timestamp: number;
  }
}