/**
 * A cart line is identified by product + size + set of extras, so two
 * different customizations of the same product are two distinct lines.
 */
export type CartLineIdentity = {
  id: string;
  size?: { id: string } | null;
  extra?: { id: string }[] | null;
};

export function cartLineKey(item: CartLineIdentity): string {
  const extraIds = (item.extra ?? []).map((extra) => extra.id).sort();
  return [item.id, item.size?.id ?? "", extraIds.join(",")].join("|");
}
