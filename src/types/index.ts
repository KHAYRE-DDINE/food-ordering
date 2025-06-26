export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface FilterState {
  search?: string;
  // Add other filter properties here as needed
}
