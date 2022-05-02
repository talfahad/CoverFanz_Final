import { Text } from 'react-native';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import FontSizes from '../../constants/FontSizes';

const ShowTime = () => {
  return (
    <Text
      style={{
        fontFamily: FontNames.PainterRegular,
        color: Colors.accentColor,
        fontSize: FontSizes.showTimeFS,
      }}>
      It's show time!
    </Text>
  );
};

export default ShowTime;
