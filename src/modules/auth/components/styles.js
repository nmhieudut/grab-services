import {StyleSheet, Dimensions} from 'react-native';
import color from '../../../constants/Colours';

const heightScr = Dimensions.get('screen').height;
const widthScr = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  welcome: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.PRIMARY}`,
    height: heightScr / 3,
  },
  inputArea: {
    padding: 6,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  loginButtonContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 8,
    flex: 1,
    height: 60,
    backgroundColor: color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthScr / 2,
  },
  registerButton: {
    borderRadius: 8,
    flex: 1,
    height: 30,
    justifyContent: 'center',
    width: widthScr / 3,
  },
  registerButtonContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
