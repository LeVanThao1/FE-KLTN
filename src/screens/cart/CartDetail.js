import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';

const imageURL =
  'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2';
export default function CartDetail(props) {
  const [amount, setAmount] = React.useState(0);

  const validAmount = (amount) => {
    if (amount < 1) {
      //min
      setAmount(1);
    } else if (amount > 10) {
      //max
      setAmount(10);
    } else {
      setAmount(amount);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: props.imageURL ? props.imageURL : imageURL,
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', padding: 8}}>
        <TouchableOpacity>
          <Text style={{fontSize: 18, color: '#000000', marginBottom: 8}}>
            Tên Sách
          </Text>
        </TouchableOpacity>

        <Text
          style={{fontSize: 16, color: 'rgba(68, 108, 179, 1)', marginTop: 8}}>
          100000
        </Text>
      </View>
      <View
        style={{
          width: '20%',
          height: '50%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => validAmount(amount - 1)}>
          <Icon name="arrow-back" type="Ionicons" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.amountInput}
          value={amount + ''}
          keyboardType="numeric"
          editable={false}
        />
        <TouchableOpacity onPress={() => validAmount(amount + 1)}>
          <Icon name="arrow-forward" type="Ionicons" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#696969',
    borderWidth: 0.2,
    borderRadius: 4,
    padding: 10,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 80, height: 80},
  icon: {
    fontSize: 20,
    color: '#000000',
  },
  amountInput: {
    padding: 4,
    margin: 4,
    borderWidth: 0.2,
    borderColor: '#696969',
    textAlign: 'center',
    color: '#000000',
  },
});
