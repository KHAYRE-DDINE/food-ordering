import Menu from './index';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import { ProductWithRelations } from '@/types/product';

interface MenuWrapperProps {
  items: ProductWithRelations[];
}

export default async function MenuWrapper({ items }: MenuWrapperProps) {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);

  return <Menu items={items} noProductsFound={noProductsFound} />;
}
