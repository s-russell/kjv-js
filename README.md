# Usage

Call the function:

```javascript
getVerses("2 cor 5:20-6:3");
```

Get the verses back as JSON:

```json
[
  {
    "book": "co2",
    "verseNumber": 20,
    "chapterNumber": 5,
    "verseText": "Now then we are ambassadors for Christ, as though God did beseech you by us: we pray you in Christ's stead, be ye reconciled to God."
  },
  {
    "book": "co2",
    "verseNumber": 21,
    "chapterNumber": 5,
    "verseText": "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him."
  },
  {
    "book": "co2",
    "verseNumber": 1,
    "chapterNumber": 6,
    "verseText": "We then, as workers together with him, beseech you also that ye receive not the grace of God in vain."
  },
  {
    "book": "co2",
    "verseNumber": 2,
    "chapterNumber": 6,
    "verseText": "(For he saith, I have heard thee in a time accepted, and in the day of salvation have I succoured thee: behold, now is the accepted time; behold, now is the day of salvation.)"
  },
  {
    "book": "co2",
    "verseNumber": 3,
    "chapterNumber": 6,
    "verseText": "Giving no offence in any thing, that the ministry be not blamed:"
  }
]
```

Books can be referenced by any of the `display` or `alternates` values (case insensitive) listed in [book-data.json](https://github.com/s-russell/kjv-js/blob/main/data/book-data.json). More examples that should work:

- `getVerse("Genesis 1:1")`
- `getVerse("leviticus 2:4")`
- `getVerse("psa 2:1")`
- `getVerse("II Peter 1:1")`
- `getVerses("Genesis 1:1-5")`
- `getVerses("lev 2:10-15")`
- `getVerses("i cor 1:1-2:7")`
- `getVerses("exodus 1:1-2:3")`
