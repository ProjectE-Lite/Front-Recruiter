import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'พนักงานเสิร์ฟ', value: '1' },
  { label: 'พนักงานทำความสะอาด', value: '2' },
  { label: 'ผู้ช่วยเชฟ', value: '3'},
  { label: 'พนักงานต้อนรับ', value: '4'},
  { label: 'พนักงานล้างจาน', value: '5'},
  { label: 'พนักงานส่งอาหาร', value: '6'}, 
  { label: 'พนักงานครัวร้อน', value: '7'},
];

const DropdownWork = ({onValueChange}) => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="ประเภทงาน"
      value={value}
      onChange={item => {
        setValue(item.value);
        onValueChange(item.label);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownWork;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 50,
    width: "auto",
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});