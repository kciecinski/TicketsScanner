import { useCallback, useEffect } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { useMutation } from 'react-query';
import ApiService from './ApiService';

const useUpdateTicket = (dropDown: DropdownAlert | null, active: boolean) => {
  const mutation = useMutation((ticketId: number) =>
    setTicketActive(ticketId, { active }),
  );

  const setTicketActive = useCallback(
    async (ticketId: number, params: Partial<ITicketRestApiResponse>) =>
      await ApiService.patch<ITicketRestApiResponse>(
        `tickets/${ticketId}.json`,
        params,
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

  return mutation;
};

export default useUpdateTicket;
