import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,

} from 'react-native';
import React, {useState} from 'react';
import {uniqid} from './helper';
import {placeholder} from '@babel/types';
import Modal from 'react-native-modal';
import EditModal from './components/EditModal';
import AntDesign from 'react-native-vector-icons/AntDesign'

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  const addMyText = () => {
    if (text != undefined && text !== '' && text?.trim() != '') {
      setList([...list, {id: uniqid(), text: text}]);
      setText();
      console.log(list);
    }
  };
  const deleteAll = () => {
    setList([]);
  };

  const deleteTask = id => {
    setList(list.filter(item => item.id !== id));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.tasks}>
        <View style={styles.allTasks}>
          <Text style={styles.editedTask}>{item.text}</Text>
          <View style={styles.taskComponent}>
            <TouchableOpacity
              style={styles.taskDelete}
              onPress={() => {
                deleteTask(item.id);
              }}>
              <Text style={styles.delete}> Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.taskEdit}
              onPress={() => {
                setId(item.id);
                setModalVisible(true);
                setEditText(item.text);
              }}>
            <AntDesign name='windows' style={{color:'red', fontSize:50}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const [text, setText] = useState();
  const [list, setList] = useState([]);
  const [id, setId] = useState(null);
  const [editText, setEditText] = useState();

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.container}>
            <Text style={styles.heading}>My Todo List </Text>
            <Text style={styles.counter}>{list.length}</Text>

          </View>
          <View>
            <FlatList
              style={{height: '80%'}}
              showsVerticalScrollIndicator={false}
              data={list}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <Text style={styles.emptyList}>List is empty</Text>
              )}
              contentContainerStyle={{paddingBottom: 4}}
            />
          </View>
        </View>
        <EditModal
          {...{isModalVisible, setModalVisible, id, list, setList, editText}}
        />

        <View style={styles.inputDelete}>
          <View style={styles.inputAdd}>
            <View style={styles.textInput}>
              <TextInput
                placeholder="Add Task"
                onChangeText={value => setText(value)}
                value={text}></TextInput>
            </View>

            <TouchableOpacity onPress={addMyText} style={styles.addButton}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={deleteAll} style={styles.deleteButton}>
            <Text style={styles.delete}>Delete All My Tasks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#8E7DBE',
  },
  container: {
    backgroundColor: '#643173',
    padding: 35,
    flexDirection:'row',
    justifyContent:'space-between'
  },
counter:{
  color: 'white',
  fontWeight: '800',
  fontSize: 24,
},
  heading: {
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
  },
  textInput: {
    borderRadius: 20,
    borderColor: '#333333',
    color: 'white',
    backgroundColor: '#C0B9DD',
    borderWidth: 2,
    padding: 10,
    marginTop: 5,
    width: '100%',
  },
  editedTask: {
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 10,
    width: '60%',
  },
  tasks: {},
  inputDelete: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
  },
  inputAdd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 20,
    paddingBottom: 5,
  },
  add: {
    color: 'white',
    fontWeight: 'bold',
  },
  delete: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    borderRadius: 20,
    borderColor: '#643173',
    backgroundColor: '#643173',
    color: '#fffff',
    borderWidth: 1,
    position: 'absolute',
    padding: 18,
  },
  deleteButton: {
    borderRadius: 20,
    borderColor: '#333333',
    color: 'white',
    backgroundColor: '#333333',
    borderWidth: 2,
    padding: 10,
    marginTop: 5,
  },
  emptyList: {
    borderWidth: 1,
    backgroundColor: 'purple',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    margin: 10,
  },
  taskDelete: {},
  taskEdit: {margin: 5, alignSelf: 'center'},
  taskComponent: {
    flexDirection: 'column',
  },
  allTasks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: '#C0B9DD',
    backgroundColor: '#7D5BA6',

    // position:'absolute'
  },
});

export default App;
