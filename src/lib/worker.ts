/**
  @example
  const expensiveFn = () => {
    let result = 0
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 700; j++) {
        for (let k = 0; k < 300; k++) {
          result = result + i + j + k
        }
      }
    }
    return result
  }
  worker(expensiveFn).then(console.log) // 11546850000000
 */
const worker = (fn: Function) => {
  const worker = new Worker(
    URL.createObjectURL(
      new Blob([`postMessage((${fn})())`], {
        type: 'application/javascript; charset=utf-8',
      }),
    ),
  )
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data)
      worker.terminate()
    }
    worker.onerror = (err) => {
      rej(err)
      worker.terminate()
    }
  })
}

export default worker
