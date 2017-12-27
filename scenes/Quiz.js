import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Card from "../components/Card";
import { green, purple, red } from "../utils/colors";
import { resetQuiz } from "../actions/index";
import { clearNotification, setLocalNotification } from '../utils/notification';


class Result extends Component {

	state = {
		resultAnim: new Animated.Value(1),
	};

	componentDidMount() {
		const { resultAnim } = this.state;

		Animated.sequence([
			Animated.timing(resultAnim, {
				toValue: 1.2,
				duration: 200,
			}),
			Animated.spring(resultAnim, {
				toValue: 1,
				friction: 8,
			})
		]).start();

		clearNotification()
			.then(setLocalNotification);
	}

	render() {
		const { rating } = this.props;
		const { resultAnim } = this.state;

		if (rating < 50) {
			return (
				<Animated.View style={
					[
						styles.container,
						{ transform: [{ scale: resultAnim }] }
					]}>
					<MaterialIcons color={red} name='thumb-down' size={60}/>
					<Text style={[styles.resultHeader, { color: red }]}>Try harder.</Text>
					<Text style={styles.resultText}>Your answers are <Text
						style={{ color: red }}>{parseFloat(rating).toFixed(0)}%</Text> correct.</Text>
				</Animated.View>
			);
		}

		return (
			<Animated.View style={[
				styles.container,
				{ transform: [{ scale: resultAnim }] }
			]}>
				<MaterialIcons color={green} name='thumb-up' size={60}/>
				<Text style={[styles.resultHeader, { color: green }]}>Congratulations!</Text>
				<Text style={styles.resultText}>Your answers are <Text
					style={{ color: green }}>{parseFloat(rating).toFixed(0)}%</Text> correct!</Text>
			</Animated.View>
		);
	}
}

/**
 * @name Quiz
 * @description
 * Show the Card question
 * Show a option to see the answer on the card's back
 * Show a button 'Correct'
 * Show a button 'Incorrect'
 * Show the number of cards left
 * Show the percent of right answers
 */
class Quiz extends Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(resetQuiz());
	}

	render() {
		const { questions = [], currentCard, correctCount } = this.props;
		const card = questions[currentCard];
		const end = currentCard >= questions.length;
		const currentLabel = end ? questions.length : currentCard + 1;

		if (questions.length <= 0) {
			return (
				<View style={styles.container}>
					<MaterialCommunityIcons color={purple} size={50} name='emoticon-sad'/>
					<Text style={{ color: purple }}>No cards registered.</Text>
					<Text style={{ color: purple }}>Please, add some cards.</Text>
				</View>
			);
		}

		return (
			<View style={{ flex: 1 }}>
				{!end && <Text style={styles.countLabel}>{currentLabel} / {questions.length}</Text>}
				{
					!end
						?
						<Card
							key={card.answer}
							question={card.question}
							answer={card.answer}
						/>
						:
						<Result
							rating={(correctCount / questions.length) * 100}
						/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countLabel: {
		color: purple,
		fontSize: 18,
		marginTop: 10,
		marginRight: 10,
		textAlign: 'right'
	},
	resultHeader: {
		fontSize: 25,
		marginTop: 10,
		marginBottom: 5,
	},
	resultText: {
		fontSize: 18,
	},
});

function mapStateToProps({ deck, quiz }) {
	return {
		title: deck.title,
		questions: deck.questions,
		currentCard: deck.currentCard,
		correctCount: quiz.correctCount,
	};
}

export default connect(mapStateToProps)(Quiz);