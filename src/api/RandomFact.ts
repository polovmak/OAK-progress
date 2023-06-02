export interface IRandomFact {
  id: string
  language: string
  permalink: string
  source: string
  source_url: string
  text: string
}
export const getRandomFact = async (): Promise<IRandomFact> => {
  const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
  return res.json()
}