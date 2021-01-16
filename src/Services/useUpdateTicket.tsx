import { useCallback, useEffect } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { useMutation } from 'react-query';
import ApiService from './ApiService';

const useUpdateTicket = (dropDown: DropdownAlert | null) => {
  const mutation = useMutation((ticketId: number) => setTicketActive(ticketId));
  const mutationDisactivate = useMutation((ticketId: number) =>
    setTicketDisactive(ticketId),
  );

  const setTicketActive = useCallback(
    async (ticketId: number) =>
      await ApiService.patch<ITicketRestApiResponse>(
        `tickets/${ticketId}.json`,
        {
          active: true,
        },
      ),
    [],
  );

  const setTicketDisactive = useCallback(
    async (ticketId: number) =>
      await ApiService.patch<ITicketRestApiResponse>(
        `tickets/${ticketId}.json`,
        {
          active: false,
        },
      ),
    [],
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      dropDown?.alertWithType(
        'success',
        'Success',
        'Ticket actived successfully',
      );
    }
    if (mutation.isError) {
      const message = mutation.error.response?.data?.message;
      dropDown?.alertWithType(
        'error',
        'Error',
        `Something went wrong\n${message ? `${message}` : ''}`,
      );
    }
  }, [dropDown, mutation.error, mutation.isError, mutation.isSuccess]);

  return { activate: mutation, disActivate: mutationDisactivate };
};

export default useUpdateTicket;
