import * as API from '../utils/api';
import { ADD_DECK, FETCH_DECKS, INCREMENT_CORRECT, NEXT_CARD, RESET_QUIZ, SET_CURRENT_DECK } from './action-types';

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck,
	};
}

export function nextCard() {
	return {
		type: NEXT_CARD,
	};
}

export function resetQuiz() {
	return {
		type: RESET_QUIZ,
	}
}

export function incrementCorrect() {
	return {
		type: INCREMENT_CORRECT,
	}
}

export function fetchDecks(decks) {
	return {
		type: FETCH_DECKS,
		decks,
	};
}

export function setCurrentDeck(deck) {
	return {
		type: SET_CURRENT_DECK,
		deck,
	};
}

export const submitDeck = (deck) => dispatch => {
	return API.addDeck(deck)
		.then(() => dispatch(addDeck(deck)));
};

export const updateDeck = (deck) => dispatch => {
	return API.addDeck(deck)
		.then(() => dispatch(addDeck(deck)))
		.then(() => dispatch(setCurrentDeck(deck)))
		.then(() => dispatch(getDecks()));
};

export const getDecks = () => dispatch => {
	return API.getDecks()
		.then(decks => dispatch(fetchDecks(decks)));
};
