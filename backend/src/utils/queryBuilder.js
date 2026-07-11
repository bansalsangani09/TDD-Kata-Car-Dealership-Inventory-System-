/**
 * Builds a query filter object for vehicle searches.
 * Supports partial case-insensitive match on fields.
 * Supports price bounds.
 *
 * @param {object} filters - The search request query parameters
 * @returns {object} The query filter object for Prisma
 */
const buildVehicleQuery = ({ make, model, category, minPrice, maxPrice }) => {
  const conditions = [];

  // When search bar sets both make and model to the search query, do OR search
  if (make && model && make === model) {
    conditions.push({
      OR: [
        { make: { contains: make, mode: "insensitive" } },
        { model: { contains: model, mode: "insensitive" } },
        { category: { contains: make, mode: "insensitive" } },
      ],
    });
  } else {
    if (make) {
      conditions.push({ make: { contains: make, mode: "insensitive" } });
    }
    if (model) {
      conditions.push({ model: { contains: model, mode: "insensitive" } });
    }
  }

  if (category) {
    let categoryList = [];
    if (Array.isArray(category)) {
      categoryList = category;
    } else if (typeof category === "string") {
      categoryList = category.split(",").map((c) => c.trim()).filter(Boolean);
    }

    if (categoryList.length > 0) {
      conditions.push({
        category: {
          in: categoryList,
          mode: "insensitive",
        },
      });
    }
  }

  if (minPrice || maxPrice) {
    const priceCond = {};
    if (minPrice) {
      priceCond.gte = Number(minPrice);
    }
    if (maxPrice) {
      priceCond.lte = Number(maxPrice);
    }
    conditions.push({ price: priceCond });
  }

  if (conditions.length === 0) {
    return {};
  }

  return {
    AND: conditions,
  };
};

module.exports = { buildVehicleQuery };
