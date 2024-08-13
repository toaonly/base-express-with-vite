import { stringToHex } from '../../utils'

export const hexValueMap = {
  twoDash: stringToHex('--'),
  lineBreak: stringToHex('\r\n'),
  contentDisposition: stringToHex('Content-Disposition: form-data'),
  contentType: stringToHex('Content-Type: '),
  slash: stringToHex('/'),
  fieldDivider: stringToHex('; '),
  doubleQuat: stringToHex('"'),
  equal: stringToHex('='),
}

export const fieldDividerRegExp = new RegExp(
  `(((${hexValueMap.fieldDivider})([a-z0-9]+(${hexValueMap.equal})(${hexValueMap.doubleQuat})[a-z0-9]+(${hexValueMap.doubleQuat})))+)(${hexValueMap.lineBreak})(((${hexValueMap.contentType})([a-z0-9])+(${hexValueMap.slash})([a-z0-9])+)?)(${hexValueMap.lineBreak})`,
  'i'
)
