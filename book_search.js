/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
	/** You will need to implement your search and
	 * return the appropriate object here. */

	var result = {
		SearchTerm: "",
		Results: [],
	};

	result.SearchTerm = searchTerm;

	for (let i = 0; i < scannedTextObj.length; i++) {
		//iterate over each different book and determine which lines contain the search term
		findSearchTermSingleBook(searchTerm, scannedTextObj[i], result.Results);
	}

	return result;
}

/**
 * Searches for matches in a single scanned text and appends them to the given results array.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} singleScannedTextObj - A JSON object representing the scanned text.
 * @param {Array} results - The array which results will be appended to.
 * */
function findSearchTermSingleBook(searchTerm, singleScannedTextObj, results) {
	for (let i = 0; i < singleScannedTextObj.Content.length; i++) {
		const Content = singleScannedTextObj.Content[i];

		//This is what we will add to the results if we find the search term
		const result = {
			ISBN: singleScannedTextObj.ISBN,
			Page: Content.Page,
			Line: Content.Line,
		};

		if (findSearchTermSingleLine(searchTerm, Content.Text)) {
			results.push(result);
		}
	}
}

/**
 * Searches a single line for a valid instance of the searchTerm. Checks to make sure that if the
 * searchTerm is found in the text, it is its own word and not a substring of a different word.
 * For example: searchTerm = "a", text = "The baby"
 * This example will return false because the only instance of a in the text is not its own word.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {string} text - A string representing the scanned line of text.
 * @returns {boolean} - True if a valid instance of the search term was found in the text and false otherwise.
 */
function findSearchTermSingleLine(searchTerm, text) {
	//the empty string is contained in any other string so we will return true
	if (searchTerm === "") {
		return true;
	}
	if (!text.includes(searchTerm)) {
		return false; //no need to search if we know the term isn't there
	}
	/*if we don't desire the behavior of the found term needing to be its own word, then we would
    simply return text.includes(searchTerm) above.  
    */
	//here we check each potential instance of the search term and see if it is its own word or not
	let StartIndex = 0;
	while (StartIndex < text.length - searchTerm.length) {
		let res = text.indexOf(searchTerm, StartIndex);
		if (res === -1) {
			//this means that there is no instance of the search term after the starting index
			return false;
		} else if (isOwnWord(text, res, searchTerm.length)) {
			return true;
		}
		StartIndex = res + 1; //keep looking one past where we last looked
	}
	return false;
}

/**
 * Checks if a word is its own word in a line of text or if it is a small part of a larger word.
 * Does this by determining if the word is preceded or followed by an alphanumeric character, if
 * that is the case than it is judged that the word is part of a larger word and therefore not
 * its own word.
 * @param {string} text - The line of text.
 * @param {int} StartIndex - The index that the search term starts on.
 * @param {int} len - The length of the search term.
 * @returns {boolean} - True if the word is its own word and false otherwise.
 */
function isOwnWord(text, StartIndex, len) {
	//word must start at the beginning of the text or be preceded by a non alphanumeric character to be its own word
	const beginCriteria =
		StartIndex === 0 || text[StartIndex - 1].match(/^[a-zA-Z0-9]+$/) === null;

	//word must end at the end of the text or be followed by a non alphanumeric character to be its own word
	const endCriteria =
		StartIndex + len === text.length ||
		text[StartIndex + len].match(/^[a-zA-Z0-9]+$/) === null;

	return beginCriteria && endCriteria;
}

/** Example input object. */
const twentyLeaguesIn = [
	{
		Title: "Twenty Thousand Leagues Under the Sea",
		ISBN: "9780000528531",
		Content: [
			{
				Page: 31,
				Line: 8,
				Text: "now simply went on by her own momentum.  The dark-",
			},
			{
				Page: 31,
				Line: 9,
				Text: "ness was then profound; and however good the Canadian's",
			},
			{
				Page: 31,
				Line: 10,
				Text: "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
];

/** Example output object */
const twentyLeaguesOut = {
	SearchTerm: "the",
	Results: [
		{
			ISBN: "9780000528531",
			Page: 31,
			Line: 9,
		},
	],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
	console.log("PASS: Test 1");
} else {
	console.log("FAIL: Test 1");
	console.log("Expected:", twentyLeaguesOut);
	console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
	console.log("PASS: Test 2");
} else {
	console.log("FAIL: Test 2");
	console.log("Expected:", twentyLeaguesOut.Results.length);
	console.log("Received:", test2result.Results.length);
}

/** My added unit tests: */

/*
Test objects for added unit tests:
*/

const testManager = [];

const testInputMan = [
	{
		Title: "Test Input Man",
		ISBN: "111",
		Content: [
			{
				Page: 5,
				Line: 2,
				Text: "the man worked very hard every day shoveling hey",
			},
			{
				Page: 5,
				Line: 3,
				Text: "but he could not pay his bills.",
			},
			{
				Page: 5,
				Line: 4,
				Text: "He eventually decided to sell his car",
			},
		],
	},
];
//#1
testManager.push({
	SearchTerm: "he",
	InputText: testInputMan,
	Output: {
		SearchTerm: "he",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 3,
			},
		],
	},
	Description:
		"Check to see that the search results do not include instances where the searchterm is a substring of a different word.",
});
//#2
testManager.push({
	SearchTerm: "He",
	InputText: testInputMan,
	Output: {
		SearchTerm: "He",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 4,
			},
		],
	},
	Description: "1 Book, case sensitive.",
});

const testInput2Books = [
	{
		Title: "Test Input Man",
		ISBN: "111",
		Content: [
			{
				Page: 5,
				Line: 2,
				Text: "the man worked very hard every day shoveling hey",
			},
			{
				Page: 5,
				Line: 3,
				Text: "but he could not pay his bills.",
			},
			{
				Page: 5,
				Line: 4,
				Text: "He eventually decided to sell his car",
			},
		],
	},
	{
		Title: "Test Input Boy",
		ISBN: "222",
		Content: [
			{
				Page: 6,
				Line: 2,
				Text: "Every day, hey, hey, hey.",
			},
			{
				Page: 6,
				Line: 3,
				Text: "The boy liked to help the man using a shovel.",
			},
			{
				Page: 6,
				Line: 4,
				Text: "The man didn't like the boy's help",
			},
		],
	},
];
//#3
testManager.push({
	SearchTerm: "He",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "He",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 4,
			},
		],
	},
	Description: "2 Books Case senstive test.",
});
//#4
testManager.push({
	SearchTerm: "man",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "man",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 2,
			},
			{
				ISBN: "222",
				Page: 6,
				Line: 3,
			},
			{
				ISBN: "222",
				Page: 6,
				Line: 4,
			},
		],
	},
	Description: "2 Books Search term in both.",
});
//#5
testManager.push({
	SearchTerm: "a",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "a",
		Results: [
			{
				ISBN: "222",
				Page: 6,
				Line: 3,
			},
		],
	},
	Description:
		"2 Books, checking that searchterm will not trigger a hit if its part of a larger word.",
});
//#6
testManager.push({
	SearchTerm: "the man",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "the man",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 2,
			},
			{
				ISBN: "222",
				Page: 6,
				Line: 3,
			},
		],
	},
	Description:
		"2 Books, checking that multiple word search strings work. Also checks case sensitivity.",
});
//#7
testManager.push({
	SearchTerm: "worked",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "worked",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 2,
			},
		],
	},
	Description: "2 Books, Positive Test.",
});
//#8
testManager.push({
	SearchTerm: "liked",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "liked",
		Results: [
			{
				ISBN: "222",
				Page: 6,
				Line: 3,
			},
		],
	},
	Description: "2 Books, Positive Test.",
});
//#9
testManager.push({
	SearchTerm: "platapus",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "platapus",
		Results: [],
	},
	Description: "2 Books, Negative Test.",
});
const testInput0Books = [];
//#10
testManager.push({
	SearchTerm: "the",
	InputText: testInput0Books,
	Output: {
		SearchTerm: "the",
		Results: [],
	},
	Description: "0 Books, negative test.",
});
//#11
testManager.push({
	SearchTerm: "",
	InputText: testInput0Books,
	Output: {
		SearchTerm: "",
		Results: [],
	},
	Description: "0 Books, empty search term",
});
//#12
testManager.push({
	SearchTerm: "",
	InputText: testInputMan,
	Output: {
		SearchTerm: "",
		Results: [
			{
				ISBN: "111",
				Page: 5,
				Line: 2,
			},
			{
				ISBN: "111",
				Page: 5,
				Line: 3,
			},
			{
				ISBN: "111",
				Page: 5,
				Line: 4,
			},
		],
	},
	Description: "1 Book, empty search term",
});
//#14
testManager.push({
	SearchTerm: "help",
	InputText: testInput2Books,
	Output: {
		SearchTerm: "help",
		Results: [
			{
				ISBN: "222",
				Page: 6,
				Line: 3,
			},
			{
				ISBN: "222",
				Page: 6,
				Line: 4,
			},
		],
	},
	Description: "2 Books, positive test for word at the end of a line.",
});

const testInput2BooksEmpty = [
	{
		Title: "Test Input Man",
		ISBN: "111",
		Content: [],
	},
	{
		Title: "Test Input Boy",
		ISBN: "222",
		Content: [],
	},
];
testManager.push({
	SearchTerm: "help",
	InputText: testInput2BooksEmpty,
	Output: {
		SearchTerm: "help",
		Results: [],
	},
	Description: "2 Books, Both empty.",
});
testManager.push({
	SearchTerm: "",
	InputText: testInput2BooksEmpty,
	Output: {
		SearchTerm: "",
		Results: [],
	},
	Description: "2 Books, Both empty. Empty search term",
});

console.log("My Added Tests:");
//set this to true if you want information in the console about each test
const verbose = false;
for (let i = 0; i < testManager.length; i++) {
	const test = testManager[i];
	const testResult = findSearchTermInBooks(test.SearchTerm, test.InputText);
	if (JSON.stringify(test.Output) === JSON.stringify(testResult)) {
		if (verbose) {
			console.log(test.Description);
		}
		console.log("PASS: Test ", i + 1);
	} else {
		console.log("FAIL: Test ", i + 1);
		console.log("Expected: ", test.Output);
		console.log("Received: ", testResult);
	}
}
