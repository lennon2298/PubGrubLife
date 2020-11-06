import React from 'react';
import { Text, Pressable } from 'react-native';

const RoundedButton = ({ label, onPress }) => {
  return (
    <Pressable
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default RoundedButton;