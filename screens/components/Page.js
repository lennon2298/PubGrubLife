import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

const Page = ({ backgroundImage, imageSource, title, content }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
        <ImageBackground source={{uri: backgroundImage}}>
      <Image source={{uri: imageSource}} />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {content}
        </Text>
      </View>
      </ImageBackground>
    </View>
  );
};

export default Page;