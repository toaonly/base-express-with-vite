export const hexToString = (hex: string) => Buffer.from(hex, 'hex').toString()
export const stringToHex = (str: string) =>
  Buffer.from(str, 'utf8').toString('hex')
