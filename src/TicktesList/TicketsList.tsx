import { Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import ApiService from '../Services/ApiService';

const TicketsList = () => {
  const getTickets = useCallback(
    async () => await ApiService.get<ITicketRestApiResponse[]>('tickets.json'),
    [],
  );

  const { data, isFetching, error } = useQuery('tickets', getTickets);

  if (isFetching) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View>
      {data?.data.map((ticket) => (
        <Text key={ticket.id}>{ticket.first_name}</Text>
      ))}
    </View>
  );
};

export default TicketsList;
