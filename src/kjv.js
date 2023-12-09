import bookData from "../data/book-data.json" with { type: 'json'};
import kjv from "../data/kjv.json" with { type: 'json'};
import refIndex from "../data/ref-index.json" with {type: 'json'};

function lookupBook(query) {
  let result = null;
  for (const [
    book,
    { display, alternates },
  ] of Object.entries(bookData)) {
    if (
      [...alternates, display.toLowerCase(), book].includes(
        ("" + query).trim().toLowerCase()
      )
    ) {
      result = book;
      break;
    }
  }
  return result;
}

const parseRefFixLookup = {
  ch1: "1 chr",
  ch2: "2 chr",
  co1: "1 cor",
  co2: "2 cor",
  jo1: "1 john",
  jo2: "2 john",
  jo3: "3 john",
  kg1: "1 kings",
  kg2: "2 kings",
  pe1: "1 peter",
  pe2: "2 peter",
  sa1: "1 sam",
  sa2: "2 sam",
  th1: "1 thes",
  th2: "2 thes",
  ti1: "1 tim",
  ti2: "2 tim",
}

function fixRefStringWithOrdinalNotFirst(refString) {
  for(const [code, alt] of Object.entries(parseRefFixLookup)) {
    if(refString.startsWith(code)) {
      refString = refString.replace(code, alt)
      break
    }
  }
  return refString
}

function parseRef(refString) {
  refString = fixRefStringWithOrdinalNotFirst(refString)
  const pattern =
    /(?<ordinal>[1|2|i|ii|iii|I|II|III]*)? ?(?<book>[a-zA-Z ]+) ?(?<chapter>\d{1,3}):(?<verse>\d{1,3})/;
  let { ordinal, book, chapter, verse } = pattern.exec(refString).groups;
  book = lookupBook(`${ordinal ? ordinal + " " : ""}${book}`);
  chapter = parseInt(chapter)
  verse = parseInt(verse)
  return { book, chapter, verse };
}

function parseRangeRef(rangeRefString) {
  const pattern = /(?<fromRefStr>.+) ?- ?((?<toChapter>\d*):)?(?<toVerse>\d+)/
  const { fromRefStr, toChapter, toVerse } = pattern.exec(rangeRefString).groups
  const fromRef = parseRef(fromRefStr)
  const toRef = parseRef(`${fromRef.book} ${toChapter || fromRef.chapter}:${toVerse}`)
  return [fromRef, toRef]
}

function getVerse(refString) {
  const { book, chapter, verse } = parseRef(refString)
  return kjv[refIndex[`${book}${chapter}:${verse}`]]
}

function getVerses(rangeRefString) {
  const [fromRef, toRef] = parseRangeRef(rangeRefString)
  const fromIndex = refIndex[`${fromRef.book}${fromRef.chapter}:${fromRef.verse}`]
  const toIndex = refIndex[`${toRef.book}${toRef.chapter}:${toRef.verse}`]
  return kjv.slice(fromIndex, toIndex + 1)
}

export { parseRef, parseRangeRef, lookupBook, getVerse, getVerses };
