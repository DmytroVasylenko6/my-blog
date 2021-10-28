type TMessage = 'error' | 'info' | 'success' | 'warning';

export default interface INotif {
  status: boolean;
  message: string;
  severity: TMessage;
}
