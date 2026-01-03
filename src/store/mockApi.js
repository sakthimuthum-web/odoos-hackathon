export const delay = ms => new Promise(res => setTimeout(res, ms))

export async function mockLogin(email, password) {
  await delay(400)
  return { id: "u2", name: email.split("@")[0], email }
}

export async function fetchPopularCities() {
  await delay(300)
  return [
    { id: "pc1", name: "Tokyo", country: "Japan", costIndex: 4, popularity: 5 },
    { id: "pc2", name: "Bangkok", country: "Thailand", costIndex: 2, popularity: 5 },
  ]
}
