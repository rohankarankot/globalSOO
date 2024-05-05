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
export const getProductInfo = (id: string) => {
  return `*[_type == "product" &&  _id=="${id}"] `;
};
