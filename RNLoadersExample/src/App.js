/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import { Circle } from 'react-native-loaders';
import { ScrollView, Text, View } from 'react-native';

import styles from './App.style';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const components = this.getComponents();
    const children = [];
    components.forEach((value, index) => {
      children.push(
        <View style={styles.childContainer} key={index.toString()}>
          <View style={styles.componentContainer}>
            <Text style={styles.componentLabel}>{value.title}</Text>
            {value.component}
          </View>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Loaders!
        </Text>
        <ScrollView>
          {children}
        </ScrollView>
      </View>
    );
  }

  getComponents = () => [{
    title: 'Circle Loader',
    component: (
      <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
        <Circle style={{ marginRight: 10 }} indeterminate />
        <Circle style={{ marginRight: 10 }} progress={0.3} showsText />
        <Circle style={{ marginRight: 10 }} showsText unfilledColor={'rgba(0, 122, 255, 0.2)'} borderWidth={0} progress={0.7} />
      </View>
    )
  }]
}
