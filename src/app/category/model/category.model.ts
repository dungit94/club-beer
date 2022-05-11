import { CountryStatus } from '../../enumerations/country-status.model';

export interface ICategory {
  id?: string;
  name?: string | null;
  code?: string | null;
  status?: CountryStatus | null;
}

export class Category implements ICategory {
  constructor(public id?: string, public name?: string | null, public code?: string | null, public status?: CountryStatus | null) {}
}

export function getCategoryIdentifier(category: ICategory): string | undefined {
  return category.id;
}
