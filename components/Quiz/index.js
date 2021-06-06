// Quiz.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import QuizAndroid from "./components/QuizAndroid";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/helpers";

class Quiz extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  static navigationOptions = ({ route }) => {
    const title = route.params.title;
    return {
      title: `${title} Quiz`,
    };
  };
  render() {
    const { route, navigation } = this.props;
    const title = route.params.title;
    return <QuizAndroid title={title} navigation={navigation} />;
  }
}

export default Quiz;
