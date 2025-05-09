"use strict";

const books = [
    {
      title: 'Algorithms',
      author: ['Robert Sedgewick', 'Kevin Wayne'],
      publisher: 'Addison-Wesley Professional',
      publicationDate: '2011-03-24',
      edition: 4,
      keywords: ['computer science', 'programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
      pages: 976,
      format: 'hardcover',
      ISBN: '9780321573513',
      language: 'English',
      programmingLanguage: 'Java',
      onlineContent: true,
      thirdParty: {
        goodreads: {
          rating: 4.41,
          ratingsCount: 1733,
          reviewsCount: 63,
          fiveStarRatingCount: 976,
          oneStarRatingCount: 13
        }
      },
      highlighted: true
    },
    {
      title: 'Structure and Interpretation of Computer Programs',
      author: ['Harold Abelson', 'Gerald Jay Sussman', 'Julie Sussman (Contributor)'],
      publisher: 'The MIT Press',
      publicationDate: '2022-04-12',
      edition: 2,
      keywords: ['computer science', 'programming', 'javascript', 'software', 'engineering'],
      pages: 640,
      format: 'paperback',
      ISBN: '9780262543231',
      language: 'English',
      programmingLanguage: 'JavaScript',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 4.36,
          ratingsCount: 14,
          reviewsCount: 3,
          fiveStarRatingCount: 8,
          oneStarRatingCount: 0
        }
      },
      highlighted: true
    },
    {
      title: 'Computer Systems: A Programmer\'s Perspective',
      author: ['Randal E. Bryant', 'David Richard O\'Hallaron'],
      publisher: 'Prentice Hall',
      publicationDate: '2002-01-01',
      edition: 1,
      keywords: ['computer science', 'computer systems', 'programming', 'software', 'C', 'engineering'],
      pages: 978,
      format: 'hardcover',
      ISBN: '9780130340740',
      language: 'English',
      programmingLanguage: 'C',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 4.44,
          ratingsCount: 1010,
          reviewsCount: 57,
          fiveStarRatingCount: 638,
          oneStarRatingCount: 16
        }
      },
      highlighted: true
    },
    {
      title: 'Operating System Concepts',
      author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
      publisher: 'John Wiley & Sons',
      publicationDate: '2004-12-14',
      edition: 10,
      keywords: ['computer science', 'operating systems', 'programming', 'software', 'C', 'Java', 'engineering'],
      pages: 921,
      format: 'hardcover',
      ISBN: '9780471694663',
      language: 'English',
      programmingLanguage: 'C, Java',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 3.9,
          ratingsCount: 2131,
          reviewsCount: 114,
          fiveStarRatingCount: 728,
          oneStarRatingCount: 65
        }
      }
    },
    {
      title: 'Engineering Mathematics',
      author: ['K.A. Stroud', 'Dexter J. Booth'],
      publisher: 'Palgrave',
      publicationDate: '2007-01-01',
      edition: 14,
      keywords: ['mathematics', 'engineering'],
      pages: 1288,
      format: 'paperback',
      ISBN: '9781403942463',
      language: 'English',
      programmingLanguage: null,
      onlineContent: true,
      thirdParty: {
        goodreads: {
          rating: 4.35,
          ratingsCount: 370,
          reviewsCount: 18,
          fiveStarRatingCount: 211,
          oneStarRatingCount: 6
        }
      },
      highlighted: true
    },
    {
      title: 'The Personal MBA: Master the Art of Business',
      author: 'Josh Kaufman',
      publisher: 'Portfolio',
      publicationDate: '2010-12-30',
      keywords: ['business'],
      pages: 416,
      format: 'hardcover',
      ISBN: '9781591843528',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.11,
          ratingsCount: 40119,
          reviewsCount: 1351,
          fiveStarRatingCount: 18033,
          oneStarRatingCount: 1090
        }
      }
    },
    {
      title: 'Crafting Interpreters',
      author: 'Robert Nystrom',
      publisher: 'Genever Benning',
      publicationDate: '2021-07-28',
      keywords: ['computer science', 'compilers', 'engineering', 'interpreters', 'software', 'engineering'],
      pages: 865,
      format: 'paperback',
      ISBN: '9780990582939',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.7,
          ratingsCount: 253,
          reviewsCount: 23,
          fiveStarRatingCount: 193,
          oneStarRatingCount: 0
        }
      }
    },
    {
      title: 'Deep Work: Rules for Focused Success in a Distracted World',
      author: 'Cal Newport',
      publisher: 'Grand Central Publishing',
      publicationDate: '2016-01-05',
      edition: 1,
      keywords: ['work', 'focus', 'personal development', 'business'],
      pages: 296,
      format: 'hardcover',
      ISBN: '9781455586691',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.19,
          ratingsCount: 144584,
          reviewsCount: 11598,
          fiveStarRatingCount: 63405,
          oneStarRatingCount: 1808
        }
      },
      highlighted: true
    }
  ];

//1.1
// const [firstBook,secondBook] = books;
// console.log(firstBook,secondBook);

// //1.2
// const [,,thirdBook] = books;
// console.log(thirdBook);

// //1.3
// const ratings = [['rating', 4.19], ['ratingsCount', 144584]];
// const [[,rating],[,ratingsCount]] = ratings;
// console.log(rating,ratingsCount);

// //1.4
// const ratingStars = [63405, 1808];
// const [fiveStarRatings,oneStarRatings,threeStarRatings=0] = ratingStars;
// console.log(fiveStarRatings,oneStarRatings,threeStarRatings);

// //2.1
// const {title,author,ISBN} = books[0];
// console.log(title,author,ISBN);

// //2.2
// const {keywords:tags} = books[0];
// console.log(tags);

// //2.3
// const{language,programmingLanguage='unknown'} = books[6];
// console.log(language,programmingLanguage);

//2.4
// let bookTitle = 'unknown';
// let bookAuthor = 'unknown';
// ({title:bookTitle, author:bookAuthor} = books[0]);
// console.log(bookTitle,bookAuthor);

//2.5
// const {thirdParty:{goodreads:{rating:bookRating}}} = books[0];
// console.log(bookRating);

//2.6
// function printBookInfo({title,author,year='year unknown'}) {
//   console.log(`${title} by ${author}, ${year}`);
// }
// printBookInfo({ title: 'Algorithms', author: 'Robert Sedgewick', year: '2011' });
// printBookInfo({ title: 'Algorithms', author: 'Robert Sedgewick' });

//3.1 
// let bookAuthors = [...books[0].author,...books[1].author];
// console.log(bookAuthors);

//3.2
// function spellWord(inString) {
//   console.log(...inString)
// }
// spellWord("Casey");

//4.1 Rest Pattern and Parameters
// let [mainKeyword, ...rest] = books[0].keywords;
// console.log(mainKeyword,rest);

//4.2 Destructuring Objects
// const {publisher: bookPublisher, ...restOfTheBook} = books[1];
// console.log(bookPublisher,restOfTheBook);

//4.3 
// function printBookAuthorsCount(title,...authors) {
//   console.log(`The book \"${title}\" has ${authors.length} authors.`);
// }
// printBookAuthorsCount('Algorithms','Robert Sedgewick','Kevin Wayne');

//5.1 short circuit evaluation ||
// function hasExamplesInJava(inBook) {
//   return inBook.programmingLanguage == 'Java' || 'no data available';
// }
// console.log(hasExamplesInJava(books[0]));
// console.log(hasExamplesInJava(books[1]));

//5.2 short circuit && 
// for(let i=0; i<books.length; i++) {
//   books[i].onlineContent && console.log(`"${books[i].title}" provides online content`);
// }

//6.1 Nullish Coalescing Operator ??
// for(let i=0; i<books.length; i++) {
//   books[i].onlineContent ?? console.log(`"${books[i].title}" provides no data about its online content`);
// }

//7.1 Logical Assignments Operators
// rest1.numGuests = rest1.numGuests || 10;    SAME AS    rest1.numGuests ||= 10;
// rest1.numGuests = rest1.numGuests ?? 10;    SAME AS    rest1.numGuests ??= 10; 
// rest1.owner = rest1.owner && 'ANONYMOUS';   SAME AS    rest1.owner &&= 'ANONYMOUS';
// for(let i=0; i<books.length; i++) {
//   books[i].edition ||= 1;
//   console.log(books[i].edition)
// }

//7.2 
// for(let i=0; i<books.length; i++) {
//   books[i].highlighted &&= !(books[i].thirdParty.goodreads.rating < 4.2);
//   console.log(books[i].highlighted)
// }

//8.1
// let pageSum = 0;
// for (let book of books) {
//   pageSum += book.pages;
// }
// console.log(pageSum);

//8.2 
// let allAuthors = [];
// for (let book of books) {
//   if (typeof book.author === 'string') allAuthors.push(book.author);
//   else {
//     for (let author of book.author) allAuthors.push(author);
//   }
// }
// console.log(allAuthors);

//8.3
// for (let [i,el] of allAuthors.entries()) {
//   console.log(`${i+1}. ${el}`);
// }

//9.1 
// const bookData = [
//   ['title', 'Computer Networking: A Top-Down Approach'],
//   ['author', ['James F. Kurose', 'Keith W. Ross']],
//   ['publisher', 'Addison Wesley'],
// ];

// Do the rest
// const newBook = {
//   [bookData[0][0]]: bookData[0][1],
//   [bookData[1][0]]: bookData[1][1],
//   [bookData[2][0]]: bookData[2][1]
// };
// console.log(newBook);

//9.2
// const pages = 880;
// const newBook2 = {
//   title: 'The C Programming Language',
//   author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
//   pages
// }
// console.log(newBook2);

//10.1
// function getFirstKeyword(book) {
//   return book.keywords?.[0] ?? 'No keywords defined.';
// }
// console.log(getFirstKeyword(books[0]));

//11.1
// const entries = [];
// for(let key of Object.keys(books[0].thirdParty.goodreads)) {
//   entries.push([key]);
// }
// //console.log(entries);

// //11.2
// for(let [index,value] of Object.values(books[0].thirdParty.goodreads).entries()) {
//   entries[index].push(value);
// }
// console.log(entries);

// //12.1 Sets
// const allKeywords = [];
// for (let book of books) {
//   allKeywords.push(...book.keywords);
// }
// //12.2
// let uniqueWords = new Set(allKeywords)
// console.log(uniqueWords);

// //12.3
// uniqueWords.add('coding');
// uniqueWords.add('science');
// console.log(uniqueWords); 

// //12.4 
// uniqueWords.delete('business');
// console.log(uniqueWords);

// //12.5
// let uniqueKeywords = [...uniqueWords];
// console.log(uniqueKeywords); 

// //12.6
// uniqueWords.clear();
// console.log(uniqueWords);

// //13.1 Maps
// const bookMap = new Map([['title', 'Clean Code'], ['author', 'Robert C. Martin']]);
// console.log(bookMap);

// //13.2 
// bookMap.set('pages',464);
// console.log(bookMap);

// //13.3
// console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);

// //13.4 
// console.log(bookMap.size);

// //13.5
// //bookMap.delete('author');
// console.log(bookMap.has('author') ? `The author of the book is known. They are ${bookMap.get('author')}.` : "The author is unknown.");

//14.1
// const firstBookMap = new Map(Object.entries(books[0]));
// console.log(firstBookMap);

//14.2
// for (const [key,value] of firstBookMap) {
//   if(typeof value === 'number') console.log(key);
// }

//15.1 
// console.log(books[0].ISBN[6],books[0].ISBN[4],books[0].ISBN[9],books[0].ISBN[8]);

//15.2 
const quote = 'A computer once beat me at chess, but it was no match for me at kick boxing';
// console.log(quote.indexOf('chess'));

//15.3
let searchFor = 'boxing'
let foundAt = quote.indexOf(searchFor);
// console.log(quote.substring(foundAt,foundAt+1+searchFor.length));

//15.4
function isContributor(inName) {
  return String(inName).toLowerCase().includes("contributor");
}
// console.log(isContributor('Julie Sussman (Contributor)'));
// console.log(isContributor('Julie Sussman'));

//16.1
function normalizeAuthorName(name) {
  let names = String(name).toLowerCase().trim().split(' ');
  let normalized = [];
  for (let n of names) {
    normalized.push(n[0].toUpperCase() + n.slice(1));
  }
  return normalized.join(' ');
}
// console.log(normalizeAuthorName('  JuliE sussMan (Contributor)'));

//16.2
let newBookTitle = books[1].title.replaceAll("Programs","Software");
// console.log(newBookTitle);

//16.3 
function logBookTheme(bookTitle) {
  let normalized = bookTitle.toLowerCase().trim();
  if(normalized.indexOf("computer") == 0)
    console.log("This book is about computers");
  if(normalized.includes("algorithm") && normalized.includes("structures"))
    console.log("This book is about algorithms and structures");
  if ((normalized.endsWith('system') || normalized.endsWith('systems')) && !normalized.includes('operating')) {
    console.log("This book is about some systems, but definitely not about operating systems.");
  }
}

// logBookTheme("STructures and aLgoritHMs");
// logBookTheme("Computer structures and algorithms");
// logBookTheme("Operating Systems");
// logBookTheme("Manufacturing System");

//17.1
// function logBookCategories(categories) { 
//    return categories.split(";");
// }
// const bookCategories = 'science;computing;computer science;algorithms;business;operating systems;networking;electronics';
// console.log(logBookCategories(bookCategories));

//17.2
function getUniqueKeywordsAsString() {
  // //12.1 Sets
  let allKeywords = [];
  for (let book of books) {
    allKeywords.push(...book.keywords);
  }
  let uniqueKeywords = [...new Set(allKeywords)];
  return uniqueKeywords.join(';');
}
console.log(getUniqueKeywordsAsString())

//17.3
const bookChapters = [['The Basics', 14], ['Sorting', 254], ['Searching', 372], ['Graphs', 526], ['Strings', 706]];
logBookChapters(bookChapters);

function logBookChapters(chapters) {
  for (let chapter of chapters) {
    console.log(chapter[0].padEnd(25,'.'),chapter[1]);
  }
}
