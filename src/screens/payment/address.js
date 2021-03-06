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
    useEffect(() => {
      const provinces = getProvinces()[0];
      setProvinces({value: provinces.code + '-' + provinces.name, error: ''});
      const districts = getDistrictsByProvinceCode(provinces.code)[0];
      setDistricts({value: districts.code + '-' + districts.name, error: ''});
      const ward = getWardsByDistrictCode(districts.code)[0];
      setWard({value: districts.code + '-' + districts.name, error: ''});
    }, []);
    const [provinces, setProvinces] = useState({
      value: infoOrder
        ? infoOrder.provinces
        : getProvinces()[0].code + '-' + getProvinces()[0].name,
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
          error: 'Vui l??ng nh???p s??? ??i???n tho???i',
        });
        return false;
      }
      if (!phoneNumberValidator(deFormatPhone(phone.value))) {
        setPhone({
          ...phone,
          error: 'S??? ??i???n tho???i kh??ng ????ng',
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
          error: 'Vui l??ng nh???p h??? t??n',
        });
        count++;
      }
      if (!validatePhone(true)) {
        count++;
      }
      if (!provinces.value) {
        setProvinces({
          ...provinces,
          error: 'Vui l??ng ch???n t???nh / th??nh ph???',
        });
        count++;
      }
      if (!districts.value) {
        setDistricts({
          ...districts,
          error: 'Vui l??ng ch???n qu???n / huy???n',
        });
        count++;
      }
      if (!ward.value) {
        setWard({
          ...ward,
          error: 'Vui l??ng ch???n ph?????ng / x??',
        });
        count++;
      }
      if (!andress.value) {
        setAndress({
          ...andress,
          error: 'Vui l??ng nh???p ?????a ch??? c??? th???',
        });
        count++;
      }
      return count === 0;
    };
    const onPress = () => {
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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.field}>
          <Text>H??? v?? t??n</Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!phone.error ? 'red' : '#696969',
            }}
            placeholder="Nh???p h??? & t??n"
            value={name.value}
            onChangeText={(value) => setName({...name, value})}
            onFocus={() => {
              setName({...name, error: ''});
            }}
          />
          <Text style={styles.err}>{name.error}</Text>
        </View>
        <View style={styles.field}>
          <Text>S??? ??i???n tho???i</Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: !!phone.error ? 'red' : '#696969',
            }}
            placeholder="Nh???p S??T"
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
          <Text>T???nh / Th??nh ph???</Text>
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
              placeholder="Ch???n t???nh / th??nh ph???"
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
                  label="Ch???n t???nh / th??nh ph???"
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
          <Text>Qu???n / Huy???n</Text>
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
              placeholder="Ch???n qu???n / huy???n"
              onValueChange={(value) => {
                setDistricts({value: value, error: ''});
                const ward = getWardsByDistrictCode(value.split('-')[0])[0];
                setWard({value: ward.code + '-' + ward.name, error: ''});
              }}>
              {/* {!districts.value && (
                <Picker.Item
                  key={'qh'}
                  label="Ch???n qu???n / huy???n"
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
          <Text>Th??? x??/Th??n</Text>
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
              placeholder="Ch???n x?? / th??n"
              onValueChange={(value) => {
                setWard({value: value, error: ''});
              }}>
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
          <Text>?????a ch??? c??? th???</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nh???p ?????a ch??? c??? th???"
            value={andress.value}
            onChangeText={(value) => setAndress({...andress, value})}
            onFocus={() => {
              setAndress({...andress, error: ''});
            }}
          />
          <Text style={styles.err}>{andress.error}</Text>
        </View>
        <View>
          <Button title="X??c nh???n" color={COLORS.primary} onPress={onPress} />
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
