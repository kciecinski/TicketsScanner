export interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
  ticket: Partial<ITicketRestApiResponse> | null;
  loading: boolean;
}
