import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';
import { Button } from '@rneui/themed';
import TermResDialog from '../Dialog/TermsResDialog';
import ActivityDetailsModal from '../Modal/ActivityDetailsModal';

const ActivityListView: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const list = [
    {
      _id: 'kejfioajwefioja',
      name: 'Kids Birthday Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '20 April [APPEARING TODAY]',
    },
    {
      _id: 'kejfioajwefiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },

    {
      _id: 'kejfioajuwefiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
    {
      _id: 'kejgfioajwefiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
    {
      _id: 'kejfrioajwefiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
    {
      _id: 'kejfioajwefioojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
    {
      _id: 'kejfioajweftiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
    {
      _id: 'kejfioajwtfiojasss',
      name: 'Another Weeding Party',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: '21 April [APPEARING AFTER 1 DAY]',
    },
  ];

  return (
    <View style={styles.mainbox}>
      {list.map((l, i) => (
        <ListItem
          onPress={() => {
            setVisible1(true);
          }}
          containerStyle={{
            borderRadius: 5,
            backgroundColor: Colors.white,
            shadowColor: Colors.white,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          key={i}
          style={{
            marginVertical: 5,
            borderRadius: 5,
          }}>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <ListItem.Content style={{}}>
              <ListItem.Subtitle
                style={{ fontFamily: FontNames.MyriadProRegular }}>
                11/10/2022@12.30PM-12.35AM
              </ListItem.Subtitle>

              <ListItem.Title
                style={{ fontFamily: FontNames.MyriadProBold, marginTop: 10 }}>
                {l!.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{
                  fontFamily: FontNames.MyriadProRegular,
                  marginTop: 5,
                }}>
                Birth day party for all.
              </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Button
                  onPress={() => {
                    setVisible(true);
                  }}
                  title='ACCEPT'
                  type='clear'
                  buttonStyle={{
                    borderRadius: 5,
                    justifyContent: 'center',
                    height: 35,
                  }}
                  titleStyle={{
                    fontFamily: FontNames.FuturaBook,
                    fontSize: FontSizes.mainButtonFS,
                    color: Colors.primaryColor,
                    textTransform: 'uppercase',
                  }}
                />

                <Button
                  onPress={() => {}}
                  title='REJECT'
                  type='clear'
                  buttonStyle={{
                    borderRadius: 5,
                    justifyContent: 'center',
                    height: 35,
                  }}
                  titleStyle={{
                    fontFamily: FontNames.FuturaBook,
                    fontSize: FontSizes.mainButtonFS,
                    color: Colors.primaryColor,
                    textTransform: 'uppercase',
                  }}
                />
              </View>

              <View>
                <ListItem.Subtitle
                  style={{ fontFamily: FontNames.MyriadProRegular }}>
                  From: Bo Ziemee#2311
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    fontFamily: FontNames.MyriadProRegular,
                    textAlign: 'right',
                    color: 'green',
                  }}>
                  Accepted
                </ListItem.Subtitle>
              </View>
            </ListItem.Content>
          </View>
        </ListItem>
      ))}

      <TermResDialog visible={visible} setVisible={setVisible} />
      <ActivityDetailsModal
        isVisible={visible1}
        onClosePress={() => setVisible1(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  mainbox: {
    width: '100%',
    marginTop: 5,
  },
});

export default ActivityListView;
