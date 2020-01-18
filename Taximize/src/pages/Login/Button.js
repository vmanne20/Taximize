import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

class Button extends React.Component {
    render() {
      const {label, onPress} = this.props;
      return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgb(116, 189, 189)",
      marginBottom: 12,
      paddingVertical: 12,
      borderRadius: 4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(255,255,255,0.7)"
    },
    text: {
      color: 'white',
      textAlign: "center",
      height: 20,
      fontSize: 16
    }
  });
  
  
  export default Button;