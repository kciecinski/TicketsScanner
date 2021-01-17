import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../Config/Colors';
import useUpdateTicket from '../../Services/useUpdateTicket';
import Ticket from './Ticket';
import { IModalProps } from './Ticket.types';

const TicketsModal = ({
  modalVisible,
  setModalVisible,
  ticket,
  dropDown,
}: IModalProps) => {
  const activate = useUpdateTicket(dropDown, true);
  const deactivate = useUpdateTicket(dropDown, false);

  const onConfirm = useCallback(() => {
    setModalVisible(false);

    activate.mutate(ticket.id);
  }, [activate, setModalVisible, ticket.id]);

  const onDeactivated = useCallback(() => {
    setModalVisible(false);
    deactivate.mutate(ticket.id);
  }, [deactivate, setModalVisible, ticket.id]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Edit Ticket</Text>
        <Ticket ticket={ticket} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onConfirm}>
            <FontAwesomeIcon
              style={styles.icon}
              color={Colors.SUCCESS}
              icon={faCheck}
              size={32}
            />
            <Text style={styles.buttonText}>Activate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeactivated}>
            <FontAwesomeIcon
              style={styles.icon}
              color={Colors.ERROR}
              icon={faBan}
              size={32}
            />
            <Text style={styles.buttonText}>Disavtivate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    elevation: 2,
    backgroundColor: Colors.WILD_BLUE_YONDER,
    paddingTop: moderateScale(64),
  },
  headerText: {
    color: Colors.LIGHT_GRAY,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: moderateScale(16),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 4,
  },
  buttonText: {
    color: Colors.SNOW,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: moderateScale(16),
  },
});

export default TicketsModal;
