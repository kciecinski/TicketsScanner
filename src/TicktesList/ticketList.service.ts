import ApiService from '../Services/ApiService';

export const getTickets = async () =>
  await ApiService.get<ITicketRestApiResponse[]>('tickets.json');
