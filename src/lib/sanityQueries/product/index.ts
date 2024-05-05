export const getAllProducts = (
  minPrice?: number,
  maxPrice?: number,
  brandNames: string | string[] = [],
) => {
  const brandConditions = Array.isArray(brandNames)
    ? brandNames.map((brandName) => `brandName == "${brandName}"`).join(' || ')
    : `brandName == "${brandNames}"`;

  let query = `{
    "products": *[_type == "product"`;

  if (
    minPrice !== undefined ||
    maxPrice !== undefined ||
    brandNames.length > 0
  ) {
    query += ' && (';
    if (minPrice !== undefined) {
      query += ` price.finalPrice.value >= ${minPrice}`;
    }

    if (maxPrice !== undefined) {
      query += `${minPrice !== undefined ? ' &&' : ''} price.finalPrice.value <= ${maxPrice}`;
    }

    if (brandNames.length > 0) {
      query += `${minPrice !== undefined || maxPrice !== undefined ? ' && (' : ''} ${brandConditions}`;
      query += ')';
    }
    query += ')';
  }

  query += `] {
      _id,
      sku,
      brandName,
      "thumbnail": thumbnail[0].asset->url,
      "price": price
    },
    "totalCount": count(*[_type == "product"`;

  if (
    minPrice !== undefined ||
    maxPrice !== undefined ||
    brandNames.length > 0
  ) {
    query += ' && (';
    if (minPrice !== undefined) {
      query += ` price.finalPrice.value >= ${minPrice}`;
    }

    if (maxPrice !== undefined) {
      query += `${minPrice !== undefined ? ' &&' : ''} price.finalPrice.value <= ${maxPrice}`;
    }

    if (brandNames.length > 0) {
      query += `${minPrice !== undefined || maxPrice !== undefined ? ' && (' : ''} ${brandConditions}`;
      query += ')';
    }
    query += ')';
  }

  query += `])
  }`;

  return query;
};

export const getProductInfo = (id: string) => {
  return `*[_type == "product" &&  _id=="${id}"] `;
};
