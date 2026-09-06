import Menu from './index';
import { ProductWithRelations } from '@/types/product';
import en from '@/dictionaries/en.json';

interface MenuWrapperProps {
  items: ProductWithRelations[];
}

export default function MenuWrapper({ items }: MenuWrapperProps) {
  return <Menu items={items} labels={en.menuItem} />;
}
