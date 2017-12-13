/**
 * Created by pradeetswamy on 13/12/17
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  childContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  componentContainer: {
    flexDirection: 'column',
    minHeight: 60,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  componentLabel: {
    color: '#3b5998',
    paddingBottom: 5,
    fontSize: 16,
  }
});
