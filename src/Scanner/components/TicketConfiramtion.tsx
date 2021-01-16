import {
  faCalendarAlt,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../Config/Colors';
import { IProps } from './TicketConfirmation.types';

const TicketConfiramtion = ({
  onConfirm,
  onCancel,
  show,
  ticket,
  loading,
}: IProps) => {
  const translateY = useSharedValue(Dimensions.get('screen').height);
  const translateX = useSharedValue(moderateScale(0));

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(translateY.value),
        },
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (show) {
      translateY.value = moderateScale(-60);
    } else {
      translateY.value = Dimensions.get('screen').height;
    }
  }, [show, translateX.value, translateY.value]);

  const cancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <>
      <Animated.View style={[animationStyle, style.container]}>
        {ticket && (
          <View style={style.info}>
            <View style={style.headerContainer}>
              <Text style={style.headerText}>Ticket #{ticket.id}</Text>
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
          </View>
        )}
        <TouchableOpacity
          style={style.confirmButtonContainer}
          disabled={loading}
          onPress={onConfirm}>
          <Text style={style.confirmButtonText}>
            {loading ? 'Loading' : 'Confirm'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.cancelButtonContainer} onPress={cancel}>
          <Text style={style.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'relative',
    width: moderateScale(300),
    height: moderateScale(300),
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: moderateScale(8),
    borderColor: Colors.DENIM,
    borderWidth: 5,
  },
  text: {
    color: Colors.BLACK_TEXT,
  },
  info: {
    flexDirection: 'column',
    paddingTop: moderateScale(16),
  },
  infoText: {
    color: Colors.BLACK_TEXT,
    fontSize: moderateScale(20),
    paddingBottom: moderateScale(24),
    paddingLeft: moderateScale(8),
    lineHeight: moderateScale(32),
  },
  confirm: {
    color: Colors.BLACK_CORAL,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  headerText: {
    color: Colors.BLACK_TEXT,
    fontSize: moderateScale(28),
    paddingBottom: moderateScale(8),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerContainer: {
    borderBottomColor: Colors.WILD_BLUE_YONDER,
    borderBottomWidth: 1,
    marginBottom: moderateScale(16),
  },
  textRow: {
    flexDirection: 'row',
    paddingLeft: moderateScale(18),
  },
  confirmButtonContainer: {
    elevation: 4,
    backgroundColor: Colors.WILD_BLUE_YONDER,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '80%',
    paddingLeft: moderateScale(8),
    marginLeft: moderateScale(32),
  },
  confirmButtonText: {
    fontSize: 18,
    color: Colors.SNOW,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    elevation: 2,
  },
  cancelButtonContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: '40%',
    borderColor: Colors.ERROR,
    borderWidth: 3,
    paddingLeft: moderateScale(8),
    marginTop: moderateScale(12),
    alignSelf: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ERROR,
    alignSelf: 'center',
    textTransform: 'uppercase',
    elevation: 2,
  },
});

export default TicketConfiramtion;
