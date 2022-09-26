import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Images from '../constants/Images';
const Searchbar = props => {
  return (
    <View style={{flexDirection:'row',}}>
    <View style={props.editing? styles.searchBarContainer : styles.searchEditBarContainer}>
      <Image
        style={{alignSelf: 'center', marginLeft: 15}}
        source={Images.search}
      />
      <TextInput
        style={styles.searchBar}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={'Search'}
        placeholderTextColor="black"
      />
      {props.editing ? (
        <TouchableOpacity style={{marginRight: 8, alignSelf: 'center'}}>
          <Image source={Images.pin} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onClear} style={{marginRight: 3}}>
          <Image
            style={{height: 24, width: 24, marginTop: 8, marginRight: 8}}
            source={Images.iconcross}
          />
        </TouchableOpacity>
       
      )}
   


      {/* {props.loading ? (
        <ActivityIndicator
          style={{marginRight: '5%'}}
          size={'small'}
          animating={true}
          color={'#0078b0'}
        />
      ) : null} */}
      
    </View>
    {props.editing ? null : 
    <TouchableOpacity  onPress={props.onClear} style={{justifyContent:'center', alignItems:'center',marginBottom:10, marginLeft:15,}}>
    <Text style={{fontWeight:'bold', color:'red', textDecorationLine:'underline', alignSelf:'center', fontSize:16}}>Cancel</Text> 
    </TouchableOpacity>
     }
    
    </View>
  );
};

export default Searchbar;

// Searchbar.propType = {
//   onChangeText: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   editing: PropTypes.bool.isRequired,
//   onClear: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: '300',
    backgroundColor: '#fff',
    fontSize: 15,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width:350,
    height: 50,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    marginBottom: 12,
    // borderWidth:2
    // backgroundColor:'black'
  },
  searchEditBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width:284,
    height: 50,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    marginBottom: 12,
    // backgroundColor:'black'
  },
});
