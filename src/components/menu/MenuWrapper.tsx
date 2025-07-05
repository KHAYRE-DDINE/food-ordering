import Menu from './index';
import { ProductWithRelations } from '@/types/product';

interface MenuWrapperProps {
  items: ProductWithRelations[];
}

export default function MenuWrapper({ items }: MenuWrapperProps) {
  return <Menu items={items} />;
}
