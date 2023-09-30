import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const thumbContainerWidth = 80;
const ThumbSwitch = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <View
        style={[
          styles.switchContainer,
          isActive ? styles.activeSwitch : styles.inactiveSwitch,
        ]}
      >
        <View
          style={[
            styles.thumb,
            isActive ? styles.activeThumb : styles.inactiveThumb,
          ]}
        />
        <Text style={isActive ? styles.activeLabel : styles.inactiveLabel}>
          {isActive ? 'ON' : 'OFF'}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: thumbContainerWidth,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e7ebf0',
    flexDirection: "row"
  },
  activeSwitch: {
    backgroundColor: '#e7ebf0',
  },
  inactiveSwitch: {
    backgroundColor: '#e7ebf0',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#c192fd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeThumb: {
    transform: [{ translateX: thumbContainerWidth * 0.3 }],
  },
  inactiveThumb: {
    transform: [{ translateX: -thumbContainerWidth * 0.3 }],
  },
  activeLabel: {
    color: 'gray',
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    position: "absolute",
    left: 10
  },
  inactiveLabel: {
    color: 'gray',
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    position: "absolute",
    right: 10
  },
});

export default ThumbSwitch;
