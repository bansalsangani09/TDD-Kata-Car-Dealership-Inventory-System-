const mongoose = require("mongoose");
const ApiError = require("./ApiError");

/**
 * Validates if the given ID is a valid MongoDB ObjectId.
 * @param {string} id
 * @param {string} resourceName
 */
const validateObjectId = (id, resourceName = "Resource") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${resourceName.toLowerCase()} ID format`);
  }
};

/**
 * Reusable CRUD create helper.
 * @param {import("mongoose").Model} Model
 * @param {object} data
 */
const createDocument = async (Model, data) => {
  return await Model.create(data);
};

/**
 * Reusable CRUD read (all) helper.
 * @param {import("mongoose").Model} Model
 * @param {object} query
 */
const getAllDocuments = async (Model, query = {}) => {
  return await Model.find(query);
};

/**
 * Reusable CRUD read (one) helper.
 * @param {import("mongoose").Model} Model
 * @param {string} id
 * @param {string} resourceName
 */
const getDocumentById = async (Model, id, resourceName = "Resource") => {
  validateObjectId(id, resourceName);
  const document = await Model.findById(id);
  if (!document) {
    throw new ApiError(404, `${resourceName} not found`);
  }
  return document;
};

/**
 * Reusable CRUD update helper.
 * @param {import("mongoose").Model} Model
 * @param {string} id
 * @param {object} updateData
 * @param {string} resourceName
 */
const updateDocument = async (Model, id, updateData, resourceName = "Resource") => {
  validateObjectId(id, resourceName);
  
  const document = await Model.findById(id);
  if (!document) {
    throw new ApiError(404, `${resourceName} not found`);
  }
  
  Object.assign(document, updateData);
  await document.save();
  return document;
};

/**
 * Reusable CRUD delete helper.
 * @param {import("mongoose").Model} Model
 * @param {string} id
 * @param {string} resourceName
 */
const deleteDocument = async (Model, id, resourceName = "Resource") => {
  validateObjectId(id, resourceName);
  
  const document = await Model.findById(id);
  if (!document) {
    throw new ApiError(404, `${resourceName} not found`);
  }
  
  await document.deleteOne();
  return document;
};

module.exports = {
  validateObjectId,
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
