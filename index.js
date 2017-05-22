/*!
 * forwarded
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = forwarded

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {object} req
 * @return {array}
 * @public
 */

function forwarded(req) {
  if (!req) {
    throw new TypeError('argument req is required')
  }

  // simple header parsing
  var proxyAddrs = (req.headers['x-forwarded-for'] || '')
    .split(/ *, */)
    .filter(Boolean)
    .reverse()

  // req.connection.remoteAddress is undefined when using an unix socket,
  // we use the loopback address in that case
  var socketAddr = req.connection.remoteAddress || '127.0.0.1'
  var addrs = [socketAddr].concat(proxyAddrs)

  // return all addresses
  return addrs
}
