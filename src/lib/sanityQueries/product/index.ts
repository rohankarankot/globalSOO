export const getAllProducts = `{
  "products": *[_type == "product"] {
    _id,
    sku,
    brandName,
    "thumbnail": thumbnail[0].asset->url,
    "price": price
  },
  "totalCount": count(*[_type == "product"])
}
`;
