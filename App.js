import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Font } from 'expo';

export default class App extends React.Component {
  state = {
    activeQuoteIndex: 0,
    inFontLoaded: false,
    isQuotesLoaded: false,
    quotes: [''],
  }

  componentDidMount() {
    Font.loadAsync({
      'RobotoSlab': require('./assets/fonts/RobotoSlab-Regular.ttf'),
      'Economica': require('./assets/fonts/Economica-Regular.ttf')
    }).then(() => {
      this.setState({
        isFontLoaded: true
      })
    });
    return fetch('https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json')
      .then((response) => response.json()
      ).then((responseJson) => {
      this.setState({
        isQuotesLoaded: true,
        quotes: responseJson
      });
    })
  }

  nextQuote = () => {
    const { activeQuoteIndex, quotes } = this.state;
    if (activeQuoteIndex < quotes.length - 2) {
      this.setState({
        activeQuoteIndex: activeQuoteIndex + 1,
      });
    } else {
      this.setState({
        activeQuoteIndex: 0,
      })
    }
  }

  render() {

    const { isFontLoaded, isQuotesLoaded, quotes } = this.state;
    const activeQuote = quotes[this.state.activeQuoteIndex];
    if(isQuotesLoaded) {
      return (
        <View style={styles.container}>
          <Text style={[styles.message, isFontLoaded && { fontFamily: 'Economica' }]}>{activeQuote.quoteText}</Text>
          <Text style={[styles.author, isFontLoaded && { fontFamily: 'RobotoSlab' }]}>{activeQuote.quoteAuthor}</Text>
          <View style={styles.button}><Button title={'Next quote'} onPress={this.nextQuote}/></View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={[styles.message, isFontLoaded && { fontFamily: 'Economica' }]}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3979',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  message: {
    fontSize: 30,
    marginBottom: 20,
    color: '#F0CF61',
  },
  author: {
    fontSize: 18,
    color: '#EAEAEA',
  },
  button: {
    position: 'absolute',
    bottom: 40,
  }
});
