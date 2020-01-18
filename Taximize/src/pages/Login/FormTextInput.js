import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';

//type Props = TextInputProps;

class FormTextInput extends React.Component {
  render() {
    const {style, ...otherProps} = this.props;
    return (
      <TextInput /*color*/
        selectionColor={'blue'}
        placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'silver',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default FormTextInput;
