import {StyleSheet, Dimensions} from 'react-native';
import color from '../../../constants/Colours';

const heightScr = Dimensions.get('screen').height;
const widthScr = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  avatar: {
    height: heightScr / 6,
    width: heightScr / 6,
    borderRadius: 100,
    backgroundColor: `${color.WHITE}`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: heightScr / 6,
    width: heightScr / 6,
    borderRadius: 100,
  },
  fab: {
    position: 'absolute',
    right: widthScr / 3,
    bottom: 5,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  checkGender: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 14,
  },
  checkUser: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 14,
  },
  registerButton: {
    paddingHorizontal: widthScr / 6,
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
