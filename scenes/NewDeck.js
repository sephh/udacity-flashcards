import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';

import { purple, white, gray } from '../utils/colors'
import { submitDeck } from '../actions';

/**
 * @name NewDeck
 * @description
 * Show a option to add a title
 * Show a button to submit the title and create the Deck
 */
class NewDeck extends Component {
	state = {
		title: '',
	};

	submit = () => {
		const { dispatch, navigation } = this.props;
		const { title } = this.state;

		if (title) {
			dispatch(
				submitDeck({
					title,
					questions: [],
				})
			);

			this.setState({ title: '' });
			navigation.navigate('Decks')
		}
	};

	render() {
		return (
			<KeyboardAvoidingView behavior={'padding'} style={styles.container}>
				<View>
					<Text style={styles.questionText}>What is the title of your new deck?</Text>

					<TextInput
						style={styles.textInput} underlineColorAndroid='transparent'
						onChangeText={(text) => this.setState({ title: text })}
					/>

					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
						onPress={this.submit}
					>
						<Text style={styles.submitBtnText}>Submit</Text>
					</TouchableOpacity>

				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white,
		justifyContent: 'center',
	},
	questionText: {
		color: gray,
		fontSize: 45,
		textAlign: 'center',
	},
	textInput: {
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 2,
		padding: 5,
		fontSize: 18,
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
	iosSubmitBtn: {
		color: white,
		marginTop: 15,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	AndroidSubmitBtn: {
		backgroundColor: purple,
		marginTop: 15,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default connect()(NewDeck);