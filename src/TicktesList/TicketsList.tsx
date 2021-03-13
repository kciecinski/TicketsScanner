import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Colors } from '../Config/Colors';
import { moderateScale } from 'react-native-size-matters';
import Ticket from './components/Ticket';
import LoadingScreen from '../Commons/LoadingScreen';
import ErrorScreen from '../Commons/ErrorScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TicketsModal from './components/TicketsModal';
import DropdownAlert from 'react-native-dropdownalert';
import { useRef } from 'react';
import { getTickets } from './ticketList.service';
const TicketsList = () => {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, error, refetch } = useQuery('tickets', getTickets);
  let dropDown = useRef<DropdownAlert | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTicket, setModalTicket] = useState<ITicketRestApiResponse | null>(
    null,
  );

  const filterData = useCallback(
    (text: string) =>
      data?.data.filter((ticket) => {
        return (
          ticket.first_name.startsWith(text) ||
          ticket.last_name.startsWith(text) ||
          ticket.event_name.startsWith(text)
        );
      }),
    [data],
  );

  const filteredData = useMemo(() => filterData(searchText), [
    filterData,
    searchText,
  ]);

  const search = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <View style={style.container} testID="TicketsList">
      <ScrollView
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        testID="ticketList">
        <View style={style.searchContainer}>
          <Text style={style.headerText}>Tickets List</Text>
          <TouchableOpacity style={style.searchButton}>
            <TextInput
              style={style.searchText}
              placeholder="Search"
              underlineColorAndroid={Colors.WILD_BLUE_YONDER}
              onChangeText={search}
            />
            <FontAwesomeIcon icon={faSearch} size={18} />
          </TouchableOpacity>
        </View>
        {filteredData && filteredData.length > 0 ? (
          filteredData
            .sort((d, d2) => d.id - d2.id)
            .map((ticket) => (
              <TouchableOpacity
                testID={`ticketPressable${ticket.id}`}
                onPress={() => {
                  setModalTicket(ticket);
                  setModalVisible(true);
                }}>
                <Ticket ticket={ticket} />
              </TouchableOpacity>
            ))
        ) : (
          <View>
            <Text style={style.emptyText}>No tickets found</Text>
          </View>
        )}
      </ScrollView>
      {modalTicket && (
        <TicketsModal
          ticket={modalTicket}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          dropDown={dropDown.current}
        />
      )}
      <DropdownAlert
        testID="dropdown"
        ref={(ref) => (dropDown.current = ref)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.SNOW,
  },
  headerText: {
    color: Colors.BLACK_TEXT,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginTop: moderateScale(16),
    marginLeft: moderateScale(16),
  },
  searchContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(16),
  },
  searchButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchText: {
    fontSize: 18,
    marginRight: moderateScale(8),
    marginBottom: moderateScale(-8),
  },
  emptyText: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: moderateScale(172),
    fontSize: 32,
  },
});

export default TicketsList;
