import DropdownAlert from 'react-native-dropdownalert';

export interface IProps {
  ticket: ITicketRestApiResponse;
}

export interface IModalProps extends IProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  dropDown: DropdownAlert | null;
}
