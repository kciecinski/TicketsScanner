interface ITicketRestApiResponse {
  id: number;
  date: Date;
  first_name: string;
  last_name: string;
  active: boolean;
  event_name: string;
  created_at: Date;
  updated_at: Date;
  url: string;
}
