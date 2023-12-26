var assert = require('assert');
var fs = require('fs');

const matcherJSON = fs.readFileSync('sphinx_matcher.json');
const matcher = JSON.parse(matcherJSON);

let patterns = [];
for (const problemMatcher of matcher.problemMatcher) {
    patterns.push(problemMatcher.pattern[0]);
}

for (const pattern of patterns) {
    console.log("Patterns under test: ", pattern.regexp);
}

const sphinx_log =
`/tmp/spam/warnings_and_errors/index.rst:16: WARNING: Error in "code-block" directive:
maximum 1 argument(s) allowed, 2 supplied.
.. code-block:: ruby
            as

/tmp/spam/warnings/index.rst:22: WARNING: Problems with "include" directive path:
InputError: [Errno 2] No such file or directory: 'I_DONT_EXIST'.


/tmp/spam/warnings/index.rst:24: WARNING: Unknown directive type "BADDIRECTIVE".
.. BADDIRECTIVE:: asdf

checking consistency... /tmp/spam/warnings/notintoc.rst: WARNING: document isn't included in any toctree`;


const expected_matches = [
    {
        'file': '/tmp/spam/warnings_and_errors/index.rst',
        'line': '16',
        'severity': 'WARNING',
        'message': 'Error in "code-block" directive:'
    },
    {
        'file': '/tmp/spam/warnings/index.rst',
        'line': '22',
        'severity': 'WARNING',
        'message': 'Problems with "include" directive path:'
    },
    {
        'file': '/tmp/spam/warnings/index.rst',
        'line': '24',
        'severity': 'WARNING',
        'message': 'Unknown directive type "BADDIRECTIVE".',
    },
    {
        'file': '/tmp/spam/warnings/notintoc.rst',
        'line': null,
        'severity': 'WARNING',
        'message': "document isn't included in any toctree"
    }
]

function perform_match(pattern_object, line) {
    const match = line.match(pattern_object.regexp);

    if (!match) {
        return null;
    }

    return {
        file: pattern_object.file ? match[pattern_object.file] : null,
        line: pattern_object.line ? match[pattern_object.line] : null,
        severity: pattern_object.severity ? match[pattern_object.severity] : null,
        message: pattern_object.message ? match[pattern_object.message] : null
    };
}

let matches = [];
for (const line of sphinx_log.split(/\n/)) {
    for (const pattern_object of patterns) {
        const match = perform_match(pattern_object, line);
        if (match) {
            matches.push(match);
        }
    }
}

console.log("Matches: ", matches);
console.log("Expected matches: ", expected_matches);
assert.deepEqual(expected_matches, matches);

console.log("[x] All good!");
