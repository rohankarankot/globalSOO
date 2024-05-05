export const getAllProducts = (minPrice?: number, maxPrice?: number) => {
  let query = `{
    "products": *[_type == "product"`;

  if (minPrice !== undefined) {
    query += ` && price.finalPrice.value >= ${minPrice}`;
  }

  if (maxPrice !== undefined) {
    query += ` && price.finalPrice.value <= ${maxPrice}`;
  }

  query += `] {
      _id,
      sku,
      brandName,
      "thumbnail": thumbnail[0].asset->url,
      "price": price
    },
    "totalCount": count(*[_type == "product"`;

  if (minPrice !== undefined) {
    query += ` && price.finalPrice.value >= ${minPrice}`;
  }

  if (maxPrice !== undefined) {
    query += ` && price.finalPrice.value <= ${maxPrice}`;
  }

  query += `])
  }`;

  return query;
};

export const getProductInfo = (id: string) => {
  return `*[_type == "product" &&  _id=="${id}"] `;
};
