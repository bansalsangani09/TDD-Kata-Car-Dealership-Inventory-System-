/**
 * Builds a MongoDB query filter object for vehicle searches.
 * Supports partial case-insensitive regex match on fields: make, model, category.
 * Supports price bounds match on price using $gte and $lte.
 *
 * @param {object} filters - The search request query parameters
 * @returns {object} The query filter object for Prisma
 */
const buildVehicleQuery = ({ make, model, category, minPrice, maxPrice }) => {
  const query = {};

  if (make) {
    query.make = { contains: make, mode: "insensitive" };
  }
  if (model) {
    query.model = { contains: model, mode: "insensitive" };
  }
  if (category) {
    query.category = { contains: category, mode: "insensitive" };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.lte = Number(maxPrice);
    }
  }

  return query;
};

module.exports = { buildVehicleQuery };
