export enum Status {
  DRAFT = 'DRAFT',
  VALIDATED = 'VALIDATED'
}

export const getStatusDisplayName = (status: Status | undefined): string => {
  switch (status) {
    case Status.DRAFT:
      return 'Draft';
    case Status.VALIDATED:
      return 'Validated';
    default:
      return 'Draft';
  }
};
