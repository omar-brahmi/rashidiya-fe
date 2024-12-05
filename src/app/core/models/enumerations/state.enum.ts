export enum State {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID'
}

// Utility to get display names for the State enum
export const getStateDisplayName = (state: State | string | undefined): string => {
  switch (state) {
    case State.NEW:
      return 'New';
    case State.CANCELLED:
      return 'Cancelled';
    case State.PAID:
      return 'Paid';
    case State.PARTIALLY_PAID:
      return 'Partially Paid';
    default:
      return "";
  }
};
