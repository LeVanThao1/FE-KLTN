import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Picker} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Button,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import sub, {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from 'sub-vn';
import {deFormatPhone, formatPhone} from '../../utils/support/phoneFormat';
import {isNotEmpty, phoneNumberValidator} from '../../utils/validations';
import {COLORS} from '../../constants/themes';

const Address = ({navigation}) => {
  return useObserver(() => {
    const {
      stores: {
        order: {infoOrder, setInfoOrder},
      },
    } = useContext(MobXProviderContext);
    const [provinces, setProvinces] = useState({
      value: infoOrder ? infoOrder.provinces : undefined,
      error: '',
    });
    const [districts, setDistricts] = useState({
      value: infoOrder ? infoOrder.districts : undefined,
      error: '',
    });
    const [ward, setWard] = useState({
      value: infoOrder ? infoOrder.ward : undefined,
      error: '',
    });
    const [name, setName] = useState({
      value: infoOrder ? infoOrder.name : '',
      error: '',
    });
    const [phone, setPhone] = useState({
      value: infoOrder?.phone ? deFormatPhone(infoOrder?.phone) : '',
      error: '',
    });
    const [andress, setAndress] = useState({
      value: infoOrder ? infoOrder.andress : '',
      error: '',
    });
    const validatePhone = (type) => {
      if (!phone.value.trim() && type) {
        setPhone({
          ...phone,
          error: 'Vui lòng nhập số điện thoại',
        });
        return false;
      }
      if (!phoneNumberValidator(deFormatPhone(phone.value))) {
        setPhone({
          ...phone,
          error: 'Số điện thoại không đúng',
        });
        return false;
      }

      return true;
    };

    const validateSubmit = () => {
      let count = 0;
      if (!name.value) {
        setName({
          ...name,
          error: 'Vui lòng nhập họ tên',
        });
        count++;
      }
      if (!validatePhone(true)) {
        count++;
      }
      if (!provinces.value) {
        setProvinces({
          ...provinces,
          error: 'Vui lòng chọn tỉnh / thành phố',
        });
        count++;
      }
      if (!districts.value) {
        setDistricts({
          ...districts,
          error: 'Vui lòng chọn quận / huyện',
        });
        count++;
      }
      if (!ward.value) {
        setWard({
          ...ward,
          error: 'Vui lòng chọn phường / xã',
        });
        count++;
      }
      if (!andress.value) {
        setAndress({
          ...andress,
          error: 'Vui lòng nhập địa chỉ cụ thể',
        });
        count++;
      }
      return count === 0;
    };
    const onPress = () => {
      console.log(ward);
      if (validateSubmit()) {
        setInfoOrder({
          name: name.value,
          phone: deFormatPhone(phone.value),
          address: `${andress.value}, ${ward.value.split('-')[1]}, ${
            districts.value.split('-')[1]
          }, ${provinces.value.split('-')[1]}`,
          provinces: provinces.value,
          andress: andress.value,
          districts: districts.value,
          ward: ward.value,
        });
        navigation.goBack();
      }
    };
    console.log(ward, districts, provinces);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.field}>
          <Text>Họ và tên</Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!phone.error ? 'red' : '#696969',
            }}
            placeholder="Nhập họ & tên"
            value={name.value}
            onChangeText={(value) => setName({...name, value})}
            onFocus={() => {
              setName({...name, error: ''});
            }}
          />
          <Text style={styles.err}>{name.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>Số điện thoại</Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!phone.error ? 'red' : '#696969',
            }}
            placeholder="Nhập SĐT"
            value={phone.value}
            onChangeText={(value) =>
              setPhone((cur) => ({...cur, value: formatPhone(value)}))
            }
            onFocus={() => {
              setPhone({...phone, error: ''});
            }}
            onEndEditing={() => {
              !!phone.value && validatePhone();
            }}
          />
          <Text style={styles.err}>{phone.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>Tỉnh / Thành phố</Text>
          <View
            style={{
              ...styles.picker,
              borderColor: !!provinces.error ? 'red' : '#696969',
            }}>
            <Picker
              note
              mode="dropdown"
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#696969',
                marginVertical: -7,
              }}
              selectedValue={provinces.value}
              placeholder="Chọn tỉnh / thành phố"
              onValueChange={(value) => {
                setProvinces({value: value, error: ''});
                const districts = getDistrictsByProvinceCode(
                  value.split('-')[0],
                )[0];
                setDistricts({
                  value: districts.code + '-' + districts.name,
                  error: '',
                });
                const ward = getWardsByDistrictCode(districts.code)[0];
                setWard({value: ward.code + '-' + ward.name, error: ''});
              }}>
              {/* {!provinces.value && (
                <Picker.Item
                  key={'tt'}
                  label="Chọn tỉnh / thành phố"
                  value={undefined}
                />
              )} */}
              {getProvinces().map((pr) => (
                <Picker.Item
                  key={pr.code}
                  label={pr.name}
                  value={pr.code + '-' + pr.name}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.err}>{provinces.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>Quận / Huyện</Text>
          <View
            style={{
              ...styles.picker,
              borderColor: !!districts.error ? 'red' : '#696969',
            }}>
            <Picker
              note
              mode="dropdown"
              style={{width: '100%', marginVertical: -7}}
              selectedValue={districts.value}
              placeholder="Chọn quận / huyện"
              onValueChange={(value) => {
                setDistricts({value: value, error: ''});
                const ward = getWardsByDistrictCode(value.split('-')[0])[0];
                setWard({value: ward.code + '-' + ward.name, error: ''});
              }}>
              {/* {!districts.value && (
                <Picker.Item
                  key={'qh'}
                  label="Chọn quận / huyện"
                  value={undefined}
                />
              )} */}
              {provinces.value &&
                getDistrictsByProvinceCode(
                  provinces.value.split('-')[0],
                ).map((pr) => (
                  <Picker.Item
                    key={pr.code}
                    label={pr.name}
                    value={pr.code + '-' + pr.name}
                  />
                ))}
            </Picker>
          </View>
          <Text style={styles.err}>{districts.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>Thị xã/Thôn</Text>
          <View
            style={{
              ...styles.picker,
              borderColor: !!ward.error ? 'red' : '#696969',
            }}>
            <Picker
              note
              mode="dropdown"
              style={{width: '100%', marginVertical: -7}}
              selectedValue={ward.value}
              placeholder="Chọn xã / thôn"
              onValueChange={(value) => {
                console.log(value);
                setWard({value: value, error: ''});
              }}>
              {/* {!ward.value && (
                <Picker.Item
                  key={'xt'}
                  label="Chọn xã / thôn"
                  value={undefined}
                />
              )} */}
              {districts.value &&
                getWardsByDistrictCode(
                  districts.value.split('-')[0],
                ).map((pr) => (
                  <Picker.Item
                    key={pr.code}
                    label={pr.name}
                    value={pr.code + '-' + pr.name}
                  />
                ))}
            </Picker>
          </View>
          <Text style={styles.err}>{ward.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>Địa chỉ cụ thể</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập địa chỉ cụ thể"
            value={andress.value}
            onChangeText={(value) => setAndress({...andress, value})}
            onFocus={() => {
              setAndress({...andress, error: ''});
            }}
          />
          <Text style={styles.err}>{andress.error}</Text>
        </View>
        <View>
          <Button title="Xác nhận" color={COLORS.primary} onPress={onPress} />
        </View>
      </ScrollView>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 5,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#696969',
    letterSpacing: 0.75,
  },
  picker: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    width: '100%',
    // padding: 10,
    // paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#696969',
    // letterSpacing: 0.75,
  },
  err: {
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
  },
  field: {
    paddingBottom: 10,
  },
});

export default memo(Address);
