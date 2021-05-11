import {MobXProviderContext} from 'mobx-react';
import {useObserver} from 'mobx-react-lite';
import {Spinner} from 'native-base';
import React, {memo, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {queryData} from '../../common';
import {COLORS, NOTIFI} from '../../constants';
import {GET_IMAGES_GROUP} from '../../query/group';
import {Notification} from '../../utils/notifications';
import ImageView from 'react-native-image-viewing';
import ImageFooter from './components/ImageFooter';

const {width, height} = Dimensions.get('screen');
const ImagesView = () => {
  return useObserver(() => {
    const {
      stores: {group},
    } = useContext(MobXProviderContext);
    const {groupCurrent} = group;
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState(undefined);
    const [visible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
    useEffect(() => {
      if (groupCurrent)
        queryData(GET_IMAGES_GROUP, {id: groupCurrent})
          .then(({data}) => {
            setImages(data.getImages);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            Toast.show(Notification(NOTIFI.error, err.message));
          });
    }, [groupCurrent]);

    return (
      <View style={{flex: 1, margin: 12}}>
        {!loading ? (
          images && images.length > 0 ? (
            <>
              <ImageView
                images={images.map((t) => ({uri: t}))}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({imageIndex}) => (
                  <ImageFooter
                    imageIndex={imageIndex}
                    imagesCount={images.length}
                  />
                )}
              />
              <FlatList
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                data={images}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setIndex(index);
                      setIsVisible(true);
                    }}>
                    <Image
                      source={{uri: item}}
                      style={{
                        width: (width - 24 - 30) / 3,
                        height: (width - 24 - 30) / 3,
                        borderRadius: 10,
                        marginBottom: 30 / 2,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            // <>
            //   {images.map((ig, i) => (
            //     <TouchableOpacity
            //       key={i}
            //       onPress={() => {
            //         setIndex(i);
            //         setIsVisible(true);
            //       }}>
            //       <Image
            //         source={{uri: ig}}
            //         style={{width: 70, height: 70, borderRadius: 10, margin: 5}}
            //       />
            //     </TouchableOpacity>
            //   ))}
            //   <ImageView
            //     images={images.map((t) => ({uri: t}))}
            //     imageIndex={index}
            //     visible={visible}
            //     onRequestClose={() => setIsVisible(false)}
            //   />
            // </>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                paddingTop: 10,
              }}>
              Chưa có hình ảnh
            </Text>
          )
        ) : (
          <Spinner color={COLORS.primary} size="small" />
        )}
      </View>
    );
  });
};

export default memo(ImagesView);
