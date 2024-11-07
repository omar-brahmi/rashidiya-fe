export interface ModalConfig {
  title?: string;
  body?: string;
  saveButtonLabel?: string;
  closeButtonLabel?: string;
  yesCallback?: () => void;
  noCallback?: () => void;
}
