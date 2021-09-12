const words = require('talisman/tokenizers/words');
const porter = require('talisman/stemmers/porter');
const ngrams = require('talisman/tokenizers/ngrams');
const damerauLevenshtein = require('talisman/metrics/damerau-levenshtein');

class DocumentMatchData {
    frequency = 0;
    minDistance = 0;

    constructor(distance) {
        this.minDistance = distance;
    }

    incrementFrequency() {
        this.frequency += 1;
    }

    updateDistance(distance) {
        this.minDistance = Math.min(this.minDistance, distance);
    }

    compareTo(documentMatchData) {
        if (this.frequency === documentMatchData.frequency) {
            return this.minDistance - documentMatchData.minDistance;
        }
        return documentMatchData.frequency - this.frequency;
    }
}

function tokenizeAndNormalize(blob) {
    const tokens = words(blob)
        .map((token) => token.toLowerCase())
        .map((token) => token.replace(/[^0-9a-zA-Z]/giu, ''))
        .map((token) => porter(token));
    return tokens;
}

class SearchService {
    structures = {
        reverseIndex: {},
        nGramIndex: {},
        documentsReference: null,
    }

    config = {
        nGramN: 2,
        editDistanceRatioThreshold: 0.25,
        returnReference: false,
        getBlob: (document) => document,
    }

    constructor(config) {
        this.config = {
            ...this.config,
            ...config,
        }
    }

    buildIndex(documents) {
        const { nGramN, getBlob } = this.config;
        const { reverseIndex, nGramIndex } = this.structures;
        documents.forEach((document, index) => {
            const documentBlob = getBlob(document);
            const documentTokens = tokenizeAndNormalize(documentBlob);
            documentTokens.forEach((token) => {
                const nGrams = token.length === 1
                    ? token
                    : ngrams(nGramN, token);
                const tokenNGrams = new Set(nGrams);
                tokenNGrams.forEach((nGram) => {
                    if (!(nGram in nGramIndex)) {
                        nGramIndex[nGram] = new Set();
                    }
                    nGramIndex[nGram].add(token);
                });
                if (!(token in reverseIndex)) {
                    reverseIndex[token] = new Set();
                }
                reverseIndex[token].add(index);
            });
        });
        this.structures.documentsReference = documents;
    }

    search(query) {
        const { nGramN, editDistanceRatioThreshold, returnReference } = this.config;
        const { reverseIndex, nGramIndex, documentsReference } = this.structures;
        const candidateDocuments = new Map();
        const queryTokens = tokenizeAndNormalize(query);
        let discount = 0;
        queryTokens.forEach((token) => {
            const nGrams = token.length === 1
                ? token
                : ngrams(nGramN, token);
            const tokenNGrams = new Set(nGrams);
            const termMatches = new Set();
            // Find potential term matches.
            tokenNGrams.forEach((nGram) => {
                if (!(nGram in nGramIndex)) {
                    return;
                }
                const matches = nGramIndex[nGram];
                matches.forEach(termMatches.add, termMatches);
            });
            // Filter potential matches by edit distance.
            let foundCandidates = false;
            termMatches.forEach((match) => {
                const distance = damerauLevenshtein(token, match);
                const editDistanceRatio = distance / match.length;
                if (editDistanceRatio > editDistanceRatioThreshold) {
                    return;
                }
                foundCandidates = true;
                reverseIndex[match].forEach((document) => {
                    if (!(candidateDocuments.has(document))) {
                        candidateDocuments.set(document, new DocumentMatchData(editDistanceRatio));
                    }
                    const targetDocument = candidateDocuments.get(document);
                    targetDocument.incrementFrequency();
                    targetDocument.updateDistance(editDistanceRatio);
                });
            });
            discount += (foundCandidates) ? 0 : 1;
        });
        const candidateDocumentsEntries = [...candidateDocuments.entries()];
        const sortedDocuments = candidateDocumentsEntries.sort((a, b) => {
            const aMatchData = a[1];
            const bMatchData = b[1];            
            return aMatchData.compareTo(bMatchData);
        }).filter((entry) => {
            return entry[1].frequency >= queryTokens.length - discount - 1;
        });
        return sortedDocuments.map((document) => {
            const index = document[0];
            if (returnReference) {
                return documentsReference[index];
            }
            return index;
        });
    }
}

module.exports = SearchService;
