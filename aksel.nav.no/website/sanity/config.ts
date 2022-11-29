/* const teams = [
  {
    name: "designsystem",
    prefix: "ds",
    documents: ["komponent_artikkel", "ds_artikkel"],
    navigation: `navigation_designsystem`,
  },
  {
    name: "god_praksis",
    prefix: "gp",
    documents: ["aksel_artikkel", "aksel_blogg", "aksel_prinsipp"],
  },
]; */

/* Collection of all document-pages to account for */
/* const allDocumentTypes = teams.reduce(
  (docs, team) => [...docs, ...team.documents],
  []
); */

/* Collection of all navigation-documents */
/* const allNavDocumentIds = teams.map((x) => x?.navigation).filter((x) => x); */

/**
 * Defines when a document of a spesific type is set to stagnant or expired
 * @returns [stagnant Date, expired Date]
 */
/* function getExpireDates() {
  const stagnantDate = new Date();
  const expiredDate = new Date();
  stagnantDate.setDate(stagnantDate.getDate() + 120);
  expiredDate.setDate(expiredDate.getDate() + 180);
  return [stagnantDate, expiredDate];
} */

/* module.exports = {
  teams,
  allDocumentTypes,
  allNavDocumentIds,
  getExpireDates,
}; */

/*  */
export const allArticleDocuments = [
  "komponent_artikkel",
  /* "ds_artikkel", */
  "aksel_artikkel",
  /* "aksel_blogg", */
  /* "aksel_prinsipp", */
];

export const allArticleDocsRef = allArticleDocuments.map((x) => ({ type: x }));

export const komponentKategorier = [
  { title: "Core", value: "core" },
  { title: "Internal", value: "internal" },
];

export const grunnleggendeKategorier = [
  { title: "Styling", value: "styling" },
  { title: "Stæsj", value: "staesj" },
  { title: "Guider", value: "guider" },
];

export const monsterKategorier = [];

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
];

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];
