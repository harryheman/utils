const unescape = (str: string) =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (m) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[m] || m)
  )

export default unescape
