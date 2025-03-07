/* global CodeMirror define */
// ZETTLR SPELLCHECKER PLUGIN

(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') { // CommonJS
    mod(require('../../../node_modules/codemirror/lib/codemirror'))
  } else if (typeof define === 'function' && define.amd) { // AMD
    define(['../../../node_modules/codemirror/lib/codemirror'], mod)
  } else { // Plain browser env
    mod(CodeMirror)
  }
})(function (CodeMirror) {
  'use strict'

  var zknTagRE = /##?[^\s,.:;…!?"'`»«“”‘’—–@$%&*^+~÷\\/|<=>[\](){}]+#?/i
  var tableRE = /^\|.+\|$/i

  /**
    * This defines the Markdown Zettelkasten system mode, which highlights IDs
    * and tags for easy use of linking and searching for files.
    * THIS MODE WILL AUTOMATICALLY LOAD THE SPELLCHECKER MODE WHICH WILL THEN
    * LOAD THE GFM MODE AS THE BACKING MODE.
    * @param  {Object} config       The config with which the mode was loaded
    * @param  {Object} parserConfig The previous config object
    * @return {OverlayMode}              The loaded overlay mode.
    */
  CodeMirror.defineMode('markdown-zkn', function (config, parserConfig) {
    var markdownZkn = {
      token: function (stream, state) {
        // Immediately check for escape characters
        // Escape characters need to be greyed out, but not the characters themselves.
        if (stream.peek() === '\\') {
          stream.next()
          return 'escape-char'
        }

        // Now dig deeper for more tokens
        let zknIDRE = ''
        if (config.hasOwnProperty('zkn') && config.zkn.hasOwnProperty('idRE')) {
          zknIDRE = new RegExp(config.zkn.idRE)
        }
        let ls = ''
        let le = ''
        if (config.hasOwnProperty('zkn') && config.zkn.hasOwnProperty('linkStart') && config.zkn.hasOwnProperty('linkEnd')) {
          // Regex replacer taken from https://stackoverflow.com/a/6969486 (thanks!)
          ls = config.zkn.linkStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape raw user input
          le = config.zkn.linkEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape raw user input
        }
        let zknLinkRE = new RegExp(ls + '.+?' + le)

        // This mode should also handle tables, b/c they are rather simple to detect.
        if (stream.sol() && stream.match(tableRE, false)) {
          // Got a table line -> skip to end and convert to table
          stream.skipToEnd()
          return 'table'
        }

        // First: Tags, in the format of Twitter
        if (stream.match(zknTagRE, false)) {
          // As lookbehinds and other nice inventions of regular expressions
          // won't work here because it is a stream of characters rather than
          // one long string, we have to manually check that the tag can be
          // rendered as such. The only way where this should happen is, if the
          // tag is either on a newline or preceeded by a space. This is why we
          // don't have to manually check for escape characters - as these are
          // no spaces, they'll also match our if-condition below.
          if (!stream.sol()) {
            stream.backUp(1)
            if (stream.next() !== ' ') {
              stream.match(zknTagRE)
              return null
            }
          }

          // At this point we can be sure that this is a tag and not escaped.
          stream.match(zknTagRE)
          return 'zkn-tag'
        }

        // Second: zkn links. This is MUCH easier than I thought :o
        if ((le !== '') && stream.match(zknLinkRE)) {
          return 'zkn-link'
        }

        // Third: IDs (The upside of this is that IDs _inside_ links will
        // be treated as _links_ and not as "THE" ID of the file as long
        // as the definition of zlkn-links is above this matcher.)
        if ((zknIDRE !== '') && stream.match(zknIDRE)) {
          return 'zkn-id'
        }

        // Progress until another match.
        while (stream.next() != null &&
                !stream.match(zknTagRE, false) &&
                !stream.match(zknIDRE, false) &&
                !stream.match(zknLinkRE, false) &&
                !stream.match(/\\/, false)) { }

        return null
      }
    }

    return CodeMirror.overlayMode(CodeMirror.getMode(config, 'spellchecker'), markdownZkn, true)
  })
})
