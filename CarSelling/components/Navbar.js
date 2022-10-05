import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Navbar() {
  return (
    <View>
      <Text style={styles.text}>Navbar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        color:'red'
    },
    btn:{

    }
});