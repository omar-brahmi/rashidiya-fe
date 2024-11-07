export class Pageable {
  page: number = 0;
  pageSize: number = 10;
  sort: string = 'asc';
  searchCriteria: string = '';

  constructor(page: number = 0, pageSize: number = 10, sort: string = 'asc', searchCriteria: string = '') {
    this.page = page;
    this.pageSize = pageSize;
    this.sort = sort;
    this.searchCriteria = searchCriteria;
  }

  toQueryString(): string {
    return `?page=${this.page}&size=${this.pageSize}&sort=${this.sort}`;
  }

}
