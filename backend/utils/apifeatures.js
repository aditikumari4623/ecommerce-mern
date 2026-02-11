class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search by keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter by fields (category)
  filter() {
  const queryCopy = { ...this.queryStr };

  // Remove non-filter fields
  ["keyword", "page", "limit"].forEach((el) => delete queryCopy[el]);

  const mongoQuery = {};

  // 🔥 CORRECTLY BUILD MONGODB QUERY
  Object.keys(queryCopy).forEach((key) => {
    if (key.includes("[")) {
      // price[gte] → price.$gte
      const field = key.split("[")[0];        // price
      const operator = key.split("[")[1].replace("]", ""); // gte / lte

      if (!mongoQuery[field]) mongoQuery[field] = {};
      mongoQuery[field][`$${operator}`] = Number(queryCopy[key]);
    } else {
      mongoQuery[key] = queryCopy[key];
    }
  });

  this.query = this.query.find(mongoQuery);
  return this;
}







  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
