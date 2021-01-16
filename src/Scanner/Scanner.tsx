import React, { useCallback, useEffect, useRef, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';
import TicketConfiramtion from './components/TicketConfiramtion';
import DropdownAlert from 'react-native-dropdownalert';
import useUpdateTicket from '../Services/useUpdateTicket';

const Scanner = () => {
  const [
    currentTicet,
    setCurrentTicket,
  ] = useState<ITicketRestApiResponse | null>(null);

  let dropDown = useRef<DropdownAlert | null>(null);

  const [ticketVisible, setTicketVisible] = useState(false);

  const { activate: mutation } = useUpdateTicket(dropDown.current);

  const onSuccess = (e: BarCodeReadEvent) => {
    try {
      const data = JSON.parse(e.data) as ITicketRestApiResponse;
      setCurrentTicket(data);
      setTicketVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirm = useCallback(
    () => (currentTicet?.id ? mutation.mutate(currentTicet.id) : null),
    [currentTicet, mutation],
  );

  const onCancel = useCallback(() => {
    setCurrentTicket(null);
    setTicketVisible(false);
    mutation.reset();
  }, [mutation]);

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      setTicketVisible(false);
      mutation.reset();
    }
  }, [mutation, mutation.isError, mutation.isSuccess]);

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={3000}
      />
      <TicketConfiramtion
        onConfirm={onConfirm}
        onCancel={onCancel}
        show={ticketVisible}
        ticket={currentTicet}
        loading={mutation.isLoading}
      />
      <Text style={styles.textBold}>Scan Tickets</Text>
      <DropdownAlert ref={(ref) => (dropDown.current = ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textBold: {
    color: 'white',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Scanner;
