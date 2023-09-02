import { BinaryLike, createHash } from 'crypto'

export function hash(data: BinaryLike) {
  return createHash('sha256').update(data).digest('hex')  //create hash
}

export function validHash({ hash, dificulty = 4, prefixo = '0' }: {
  hash: string,
  dificulty: number, prefixo: string
}) {
  const check = prefixo.repeat(dificulty)
  return hash.startsWith(check)
}