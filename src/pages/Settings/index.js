import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {theme} from '../../style/theme';
import {useAuth} from '../../context/auth';

const {height, width} = Dimensions.get('window');

export const Settings = () => {
  const {signOut} = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: theme.colors.white}}>
              Tem certeza que deseja encerrar a sessão?
            </Text>
            <View style={styles.contentModal}>
              <View style={{width: 120}}>
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={styles.buttonCancel}>
                  <Text style={styles.textButtonCancel}> Cancelar </Text>
                </TouchableOpacity>
              </View>

              <View style={{width: 120}}>
                <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                  <Text style={styles.textButton}> Confirmar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.container}>
        <View style={{maxWidth: 300}}>
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
            <Text style={styles.textButton}> Encerrar a sessão </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.white,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.yellow,
  },
  textButton: {
    color: theme.colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textButtonCancel: {
    color: theme.colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentModal: {
    width: 300,
    height: 300,
    borderRadius: 12,
    backgroundColor: theme.colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
