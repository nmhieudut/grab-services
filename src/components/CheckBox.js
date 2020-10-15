import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';

export default function CheckBox({item, onSelected}) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{flexDirection: 'row', height: 54, alignItems: 'center'}}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          let c = !checked;
          setChecked(c);
          onSelected({item: item, checked: c});
        }}
      />
    </View>
  );
}
