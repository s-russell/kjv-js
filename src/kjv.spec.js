import {
  lookupBook,
  parseRef,
  getVerse,
  parseRangeRef,
  getVerses,
} from "./kjv.js";
import testData from "../data/testData.js";

describe("book names", () => {
  [
    { query: "gen", book: "gen" },
    { query: "Genesis", book: "gen" },
    { query: "2 Timothy", book: "ti2" },
    { query: "II Timothy", book: "ti2" },
    { query: "Song of Solomon", book: "sol" },
    { query: "Revelations", book: "rev" },
    { query: "psalms", book: "psa" },
    { query: "pe2", book: "pe2" },
    { query: "song of songs", book: "sol" },
  ].forEach(({ query, book }) => {
    it(`should lookup ${book} from ${query}`, () => {
      expect(lookupBook(query)).toBe(book);
    });
  });

  testData.forEach(({ ref, book, chapter, verse }) => {
    it(`should parse '${ref}'`, () => {
      expect(parseRef(ref)).toEqual({ book, chapter, verse });
    });
  });
});

describe("verse lookup", () => {
  testData.forEach(({ ref, book, chapter, verse, text }) => {
    it(`should lookup '${ref}'`, () => {
      const observed = getVerse(ref);
      expect(observed.book).toEqual(book);
      expect(observed.chapterNumber).toEqual(chapter);
      expect(observed.verseNumber).toEqual(verse);
      expect(observed.verseText).toEqual(text);
    });
  });

  [
    { rangeRef: "Genesis 1:1-5", fromRef: "gen1:1", toRef: "gen1:5" },
    { rangeRef: "exo 1:1 - 2:3", fromRef: "exo1:1", toRef: "exo2:3" },
    { rangeRef: "i cor 1:1-7", fromRef: "co11:1", toRef: "co11:7" },
    { rangeRef: "2 cor 5:1 - 10", fromRef: "co25:1", toRef: "co25:10" },
    { rangeRef: "exodus 1:1-2:3", fromRef: "exo1:1", toRef: "exo2:3" },
    { rangeRef: "leviticus1:1 - 5:1", fromRef: "lev1:1", toRef: "lev5:1" },
    { rangeRef: "joh1:1-10", fromRef: "joh1:1", toRef: "joh1:10" },
    {
      rangeRef: "psalms 119:110-145",
      fromRef: "psa119:110",
      toRef: "psa119:145",
    },
  ].forEach(({ rangeRef, fromRef, toRef }) => {
    it(`should parse range ref '${rangeRef}'`, () => {
      const [observedFromRef, observedToRef] = parseRangeRef(rangeRef);

      expect(
        `${observedFromRef.book}${observedFromRef.chapter}:${observedFromRef.verse}`
      ).toEqual(fromRef);

      expect(
        `${observedToRef.book}${observedToRef.chapter}:${observedToRef.verse}`
      ).toEqual(toRef);
    });
  });

  const expectedPassage = [
    {
      book: "co2",
      verseNumber: 20,
      chapterNumber: 5,
      verseText:
        "Now then we are ambassadors for Christ, as though God did beseech you by us: we pray you in Christ's stead, be ye reconciled to God.",
    },
    {
      book: "co2",
      verseNumber: 21,
      chapterNumber: 5,
      verseText:
        "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
    },
    {
      book: "co2",
      verseNumber: 1,
      chapterNumber: 6,
      verseText:
        "We then, as workers together with him, beseech you also that ye receive not the grace of God in vain.",
    },
    {
      book: "co2",
      verseNumber: 2,
      chapterNumber: 6,
      verseText:
        "(For he saith, I have heard thee in a time accepted, and in the day of salvation have I succoured thee: behold, now is the accepted time; behold, now is the day of salvation.)",
    },
    {
      book: "co2",
      verseNumber: 3,
      chapterNumber: 6,
      verseText:
        "Giving no offence in any thing, that the ministry be not blamed:",
    },
  ];

  it("should get passage 2 cor 5:20-6:3", () => {
    const observedVerses = getVerses("2 cor 5:20-6:3");
    expect(observedVerses).toEqual(expectedPassage);
  });
});
