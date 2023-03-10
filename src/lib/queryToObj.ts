const queryToObj = <T>(q: string) => {
  const s = q.includes('://') ? new URL(q).search : q

  return Object.fromEntries(
    new URLSearchParams(decodeURIComponent(s)).entries(),
  ) as T
}

export default queryToObj
