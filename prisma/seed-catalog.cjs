const catalog = require('./catalog.json');

/** Add missing sample menu data; never delete or overwrite restaurant/customer records. */
async function seedCatalog(db) {
  return db.$transaction(async (tx) => {
    const added = { categories: 0, products: 0, sizes: 0, extras: 0, offers: 0, promos: 0, settings: 0 };
    const categories = new Map();
    for (const category of catalog.categories) {
      let row = await tx.category.findUnique({ where: { id: category.id } });
      row ??= await tx.category.findFirst({ where: { name: category.name } });
      if (!row) { row = await tx.category.create({ data: category }); added.categories++; }
      categories.set(category.id, row);
    }
    const extraPrices = { CHEESE: 1.5, BACON: 2.5, TOMATO: 0.5, ONION: 0.5, PEPPER: 0.5 };
    for (const product of catalog.products) {
      const category = categories.get(product.categoryId);
      const existing = await tx.product.findUnique({ where: { id: product.id } })
        ?? await tx.product.findFirst({ where: { name: product.name, categoryId: category.id } });
      if (existing) continue;
      const extras = ['Desserts', 'Beverages'].includes(category.name) ? []
        : category.name === 'Sides' ? ['CHEESE', 'PEPPER']
        : ['CHEESE', 'TOMATO', 'ONION', 'PEPPER', ...(category.name === 'Burgers' ? ['BACON'] : [])];
      const sizes = ['SMALL', 'MEDIUM', 'LARGE'].map((name, index) => ({
        name, price: Math.round(product.basePrice * index * 0.25 * 100) / 100,
      }));
      await tx.product.create({ data: {
        ...product, categoryId: category.id,
        sizes: { create: sizes },
        extras: { create: extras.map(name => ({ name, price: extraPrices[name] })) },
      } });
      added.products++; added.sizes += sizes.length; added.extras += extras.length;
    }
    for (const offer of catalog.offers) {
      const existing = await tx.offer.findUnique({ where: { id: offer.id } })
        ?? await tx.offer.findFirst({ where: { title: offer.title } });
      if (!existing) { await tx.offer.create({ data: offer }); added.offers++; }
    }
    for (const promo of catalog.promos) {
      if (!await tx.promoCode.findUnique({ where: { code: promo.code } })) {
        await tx.promoCode.create({ data: { id: `demo-promo-${promo.code.toLowerCase()}`, ...promo } }); added.promos++;
      }
    }
    if (!await tx.restaurantSettings.findUnique({ where: { id: catalog.settings.id } })) {
      await tx.restaurantSettings.create({ data: catalog.settings }); added.settings++;
    }
    return { added, totals: {
      categories: await tx.category.count(), products: await tx.product.count(),
      sizes: await tx.size.count(), extras: await tx.extra.count(),
      offers: await tx.offer.count(), promos: await tx.promoCode.count(),
      orders: await tx.order.count(), users: await tx.user.count(),
    } };
  }, { maxWait: 10000, timeout: 120000 });
}

module.exports = { seedCatalog };

if (require.main === module) {
  const { PrismaClient } = require('@prisma/client');
  const db = new PrismaClient();
  seedCatalog(db)
    .then(summary => console.log(JSON.stringify(summary)))
    .catch(error => { console.error(JSON.stringify({ error: 'CATALOG_SEED_FAILED', code: error.code || null })); process.exitCode = 1; })
    .finally(() => db.$disconnect());
}
