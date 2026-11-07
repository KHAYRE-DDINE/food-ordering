import { beforeEach, describe, expect, it, vi } from 'vitest';

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }));
vi.mock('@/lib/prisma', () => ({ db: { product: { findMany } } }));
vi.mock('@/lib/cache', () => ({ cache: (fn: unknown) => fn }));
import { getBestSellers } from './products';

describe('best-seller catalog selection', () => {
  beforeEach(() => findMany.mockReset());
  it('shows curated picks when there are no real orders', async () => {
    const picks = [{ id: 'pizza' }, { id: 'burger' }, { id: 'shawarma' }];
    findMany.mockResolvedValueOnce([]).mockResolvedValueOnce(picks);
    expect(await getBestSellers(3)).toEqual(picks);
    expect(findMany.mock.calls[1][0].take).toBe(3);
  });
  it('keeps sold dishes first and fills remaining slots without duplicates', async () => {
    findMany.mockResolvedValueOnce([{ id: 'sold' }]).mockResolvedValueOnce([{ id: 'pick-a' }, { id: 'pick-b' }]);
    expect((await getBestSellers(3)).map(item => item.id)).toEqual(['sold', 'pick-a', 'pick-b']);
    expect(findMany.mock.calls[1][0]).toMatchObject({ where: { id: { notIn: ['sold'] } }, take: 2 });
  });
  it('does not replace genuine best sellers when the requested slots are filled', async () => {
    const sold = [{ id: 'sold-a' }, { id: 'sold-b' }, { id: 'sold-c' }];
    findMany.mockResolvedValueOnce(sold);
    expect(await getBestSellers(3)).toEqual(sold);
    expect(findMany).toHaveBeenCalledTimes(1);
  });
  it('returns no items for an empty section limit', async () => {
    expect(await getBestSellers(0)).toEqual([]);
    expect(findMany).not.toHaveBeenCalled();
  });
});
