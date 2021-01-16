import {
  faIdCard,
  faUserAstronaut,
  faCalendarAlt,
  faClock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../Config/Colors';
import { IProps } from './Ticket.types';

const Ticket = ({ ticket }: IProps) => {
  return (
    <View style={style.card}>
      <View style={style.textRow}>
        <FontAwesomeIcon icon={faIdCard} size={32} />
        <Text style={style.infoText}>Ticket #{ticket.id}</Text>
      </View>
      <View style={style.textRow}>
        <FontAwesomeIcon icon={faUserAstronaut} size={32} />
        <Text style={style.infoText}>
          {ticket.first_name} {ticket.last_name}
        </Text>
      </View>
      <View style={style.textRow}>
        <FontAwesomeIcon icon={faCalendarAlt} size={32} />
        <Text style={style.infoText}>{ticket.event_name}</Text>
      </View>
      <View style={style.textRow}>
        <FontAwesomeIcon icon={faClock} size={32} />
        <Text style={style.infoText}>
          {`${new Date(ticket.date).toLocaleDateString()} - ${new Date(
            ticket.date,
          ).toLocaleTimeString()}`}
        </Text>
      </View>
      <View style={style.textRow}>
        <FontAwesomeIcon icon={faCheckCircle} size={32} />
        <Text style={style.infoText}>
          {ticket.active ? 'Approved' : 'Not Approved'}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  infoText: {
    color: Colors.BLACK_TEXT,
    fontSize: moderateScale(20),
    paddingBottom: moderateScale(24),
    paddingLeft: moderateScale(8),
    lineHeight: moderateScale(32),
  },
  card: {
    height: moderateScale(292),
    borderWidth: 3,
    paddingTop: moderateScale(16),
    borderColor: Colors.WILD_BLUE_YONDER,
    backgroundColor: Colors.SNOW,
  },
  textRow: {
    flexDirection: 'row',
    paddingLeft: moderateScale(18),
  },
});

export default Ticket;
