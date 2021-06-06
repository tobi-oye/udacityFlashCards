import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Deck from "../DeckList/components/Deck";

import { gray, textGray, green, white, red } from "../../utils/colors";
import { connect } from "react-redux";
import { removeDeck } from "../../actions";
import TouchButton from "../TouchButton";
import TextButton from "../TextButton";

class DeckDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
    deck: PropTypes.object,
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = (id) => {
    this.props.removeDeck(id);
    this.props.navigation.goBack();
  };
  render() {
    const { deck } = this.props;
    console.log(this.props);

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{ backgroundColor: white, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { title: deck.title })
            }
          >
            Add Card
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: green, borderColor: white }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { title: deck.title })
            }
          >
            Start Quiz
          </TouchButton>
        </View>
        <TextButton
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
});

const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
