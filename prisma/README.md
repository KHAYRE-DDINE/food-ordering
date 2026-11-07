# Sample restaurant catalog

Run `npm run seed:catalog` against the intended database after migrations.
Back up production before running it. The seed adds missing records in one
transaction and can be repeated without duplicates. Existing records are kept.

The catalog contains 9 categories, 25 dishes with bundled local photographs,
three size options per dish, suitable optional extras, 6 offers and 6 promo codes.
The homepage codes FAMILY20, WEEKEND15 and NEW25 are included. Both fixed-value
and percentage coupons are represented. Sample contact details must be replaced
with the restaurant's own details before customer use.

Size prices are surcharges: SMALL adds zero, MEDIUM adds 25% of the base price,
and LARGE adds 50%. Beverages and desserts do not receive savory extras.

No customers, addresses, orders, payments or sales history are fabricated.
Best Sellers prioritizes genuine order history and fills empty slots using
curated product order until enough sales exist. Contact/about copy remains
managed by the existing translated site content.
