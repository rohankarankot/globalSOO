export const createFilterfromProduct = (data) => {
  // Initialize an object to store filters
  const filters: any = {
    brands: [],
    price_range: {
      min_price: Infinity,
      max_price: -Infinity,
    },
  };

  // Iterate over each product to extract brand names and price range
  data.forEach((product) => {
    const brandName = product.brandName;
    const price = product?.price?.finalPrice?.value ?? 0;

    // Add brand name to the filters if it's not already present
    if (brandName && !filters.brands.includes(brandName)) {
      filters.brands.push(brandName);
    }

    // Update minimum and maximum price
    if (price !== null) {
      filters.price_range.min_price = Math.min(
        filters.price_range.min_price,
        price,
      );
      filters.price_range.max_price = Math.max(
        filters.price_range.max_price,
        price,
      );
    }
  });

  // Convert the price range to integers
  filters.price_range.min_price = parseInt(filters.price_range.min_price);
  filters.price_range.max_price = parseInt(filters.price_range.max_price);

  return filters;
};
