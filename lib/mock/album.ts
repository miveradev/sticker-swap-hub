export type StickerData = {
  code: string
  name: string
  quantity: number
}

export type SectionData = {
  id: string
  name: string
  countryCode: string
  stickers: StickerData[]
}

export type AlbumMockData = {
  totalStickers: number
  ownedStickers: number
  sections: SectionData[]
}

export const albumMockData: AlbumMockData = {
  totalStickers: 980,
  ownedStickers: 667,
  sections: [
    {
      id: "esp",
      name: "Spain",
      countryCode: "ES",
      stickers: [
        { code: "ESP 1", name: "Unai Simón", quantity: 0 },
        { code: "ESP 2", name: "Lamine Yamal", quantity: 1 },
        { code: "ESP 3", name: "Pau Cubarsí", quantity: 4 },
        { code: "ESP 4", name: "David Raya", quantity: 0 },
        { code: "ESP 5", name: "Pedri", quantity: 2 },
        { code: "ESP 6", name: "Gavi", quantity: 0 },
        { code: "ESP 7", name: "Ferran Torres", quantity: 1 },
        { code: "ESP 8", name: "Morata", quantity: 0 },
        { code: "ESP 9", name: "Rodri", quantity: 1 },
        { code: "ESP 10", name: "Dani Carvajal", quantity: 3 },
        { code: "ESP 11", name: "Aymeric Laporte", quantity: 0 },
        { code: "ESP 12", name: "Marc Cucurella", quantity: 1 },
        { code: "ESP 13", name: "Fabián Ruiz", quantity: 0 },
        { code: "ESP 14", name: "Nico Williams", quantity: 2 },
        { code: "ESP 15", name: "Dani Olmo", quantity: 0 },
        { code: "ESP 16", name: "Álvaro Morata", quantity: 1 },
        { code: "ESP 17", name: "Mikel Merino", quantity: 0 },
        { code: "ESP 18", name: "Joselu", quantity: 1 },
        { code: "ESP 19", name: "Robin Le Normand", quantity: 0 },
        { code: "ESP 20", name: "Nacho Fernández", quantity: 1 },
      ],
    },
    {
      id: "arg",
      name: "Argentina",
      countryCode: "AR",
      stickers: [
        { code: "ARG 1", name: "Lionel Messi", quantity: 1 },
        { code: "ARG 2", name: "L. Martínez", quantity: 2 },
        { code: "ARG 3", name: "E. Fernández", quantity: 1 },
        { code: "ARG 4", name: "De Paul", quantity: 0 },
        { code: "ARG 5", name: "Di María", quantity: 3 },
        { code: "ARG 6", name: "Mac Allister", quantity: 1 },
        { code: "ARG 7", name: "Julián Álvarez", quantity: 1 },
        { code: "ARG 8", name: "Romero", quantity: 0 },
        { code: "ARG 9", name: "Emiliano Martínez", quantity: 1 },
        { code: "ARG 10", name: "Nicolás Otamendi", quantity: 0 },
        { code: "ARG 11", name: "Marcos Acuña", quantity: 2 },
        { code: "ARG 12", name: "Nahuel Molina", quantity: 0 },
        { code: "ARG 13", name: "Giovani Lo Celso", quantity: 1 },
        { code: "ARG 14", name: "Guido Rodríguez", quantity: 0 },
        { code: "ARG 15", name: "Leandro Paredes", quantity: 1 },
        { code: "ARG 16", name: "Paulo Dybala", quantity: 0 },
        { code: "ARG 17", name: "Thiago Almada", quantity: 1 },
        { code: "ARG 18", name: "Valentín Carboni", quantity: 0 },
        { code: "ARG 19", name: "Germán Pezzella", quantity: 1 },
        { code: "ARG 20", name: "Juan Musso", quantity: 0 },
      ],
    },
    {
      id: "bra",
      name: "Brazil",
      countryCode: "BR",
      stickers: [
        { code: "BRA 1", name: "Ederson", quantity: 0 },
        { code: "BRA 2", name: "Alisson", quantity: 0 },
        { code: "BRA 3", name: "Marquinhos", quantity: 0 },
        { code: "BRA 4", name: "Vinicius Jr.", quantity: 1 },
        { code: "BRA 5", name: "Rodrygo", quantity: 0 },
        { code: "BRA 6", name: "Paquetá", quantity: 0 },
        { code: "BRA 7", name: "Endrick", quantity: 2 },
        { code: "BRA 8", name: "Raphinha", quantity: 0 },
        { code: "BRA 9", name: "Militão", quantity: 1 },
        { code: "BRA 10", name: "Casemiro", quantity: 0 },
        { code: "BRA 11", name: "Bruno Guimarães", quantity: 1 },
        { code: "BRA 12", name: "Danilo", quantity: 0 },
        { code: "BRA 13", name: "Gabriel Magalhães", quantity: 0 },
        { code: "BRA 14", name: "Gerson", quantity: 1 },
        { code: "BRA 15", name: "Andreas Pereira", quantity: 0 },
        { code: "BRA 16", name: "Gabriel Martinelli", quantity: 1 },
        { code: "BRA 17", name: "Savinho", quantity: 0 },
        { code: "BRA 18", name: "Yan Couto", quantity: 0 },
        { code: "BRA 19", name: "João Pedro", quantity: 1 },
        { code: "BRA 20", name: "Igor Jesus", quantity: 0 },
      ],
    },
  ],
}
