import type { NextFunction, Request, Response } from 'express'
import { hexToString, stringToHex } from '../utils'
import { hexValueMap, fieldDividerRegExp } from './multipart/constants'
import { getBoundary } from './multipart/utils'

const multipart = (req: Request, _res: Response, next: NextFunction) => {
  const contentType = req.headers['content-type'] ?? ''
  const isMultipart = !!contentType.match(/multipart\/form\-data/)

  if (!isMultipart) {
    next()
    return
  }

  const boundary = getBoundary(contentType)
  const hexBoundary = stringToHex(boundary)

  req.on('data', (chunk: Buffer) => {
    const hexChunk = chunk
      .toString('hex')
      .replace(`${hexValueMap.twoDash}${hexBoundary}${hexValueMap.twoDash}`, '')
    const [, ...rows] = hexChunk.split(
      `${hexValueMap.twoDash}${hexBoundary}${hexValueMap.lineBreak}${hexValueMap.contentDisposition}`
    )

    rows.forEach(row => {
      const [strFields, ...rawHeaders] = row
        .match(fieldDividerRegExp)![0]
        .split(hexValueMap.lineBreak)
      const fields = strFields
        .replace(new RegExp(hexValueMap.doubleQuat, 'gi'), '')
        .split(hexValueMap.fieldDivider)
        .filter(v => v)
      const fieldMap = Object.fromEntries([
        ...new URLSearchParams(fields.map(hexToString).join('&')),
      ])
      const trimedRawHeaders = rawHeaders.map(hexToString).filter(v => v)
      const headers = trimedRawHeaders
        .slice(0, trimedRawHeaders.length - 1)
        .reduce((acc, v) => {
          const [key, value] = v.split(': ')

          return {
            ...acc,
            [key]: value,
          }
        }, {} as Record<string, string>)
      const [value] =
        row.match(
          new RegExp(
            `(?<=${hexValueMap.lineBreak}${hexValueMap.lineBreak})[A-Za-z0-9]+${hexValueMap.lineBreak}$`
          )
        ) ?? []

      if (headers['Content-Type'] && value) {
        !req.files ? (req.files = {}) : void 0
        req.files[fieldMap.name] = Buffer.from(value, 'hex')
      } else {
        req.body[fieldMap.name] = hexToString(value ?? '').trim()
      }
    })

    next()
  })
}

export default multipart
