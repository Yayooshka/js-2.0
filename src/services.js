export function service(url) {
    return fetch(url)
    .then((res) => res.json())
  }
  
export function serviceWithBody(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
  }