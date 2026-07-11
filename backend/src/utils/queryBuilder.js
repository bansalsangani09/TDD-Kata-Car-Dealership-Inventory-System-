/**
 * Builds a MongoDB query filter object for vehicle searches.
 * Supports partial case-insensitive regex match on fields: make, model, category.
 * Supports price bounds match on price using $gte and $lte.
 *
 * @param {object} filters - The search request query parameters
 * @returns {object} The query filter object for Mongoose
 */
const buildVehicleQuery = ({ make, model, category, minPrice, maxPrice }) => {
  const query = {};

  if (make) {
    query.make = { $regex: new RegExp(make, "i") };
  }
  if (model) {
    query.model = { $regex: new RegExp(model, "i") };
  }
  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  return query;
};

module.exports = { buildVehicleQuery };
