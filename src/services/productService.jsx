import axiosClient from "./interceptor";

const LANG = "en";
const PAGE_SIZE = 9;

export const productService = {
  getProductByCategory(categoryIds, page = 1) {
    return axiosClient.get("/Product/GetProductByCategory", {
      params: {
        lang: LANG,
        page,
        ids: JSON.stringify(categoryIds),
      },
    });
  },

  getProductByUrl(url) {
    return axiosClient.get("/Product/GetProductByUrl", {
      params: { lang: LANG, url },
    });
  },

  getRelatedProducts(productId) {
    return axiosClient.get("/Product/GetRelatedProducts", {
      params: { lang: LANG, id: productId },
    });
  },

  searchProducts(query) {
    return axiosClient.get("/Product/SearchProducts", {
      params: { lang: LANG, query },
    });
  },

  filterSearchProduct({ textSearch, categories, page = 1 }) {
    return axiosClient.post("/Product/FilterSearchProduct", {
      lang: LANG,
      textSearch,
      categories,
      page,
    });
  },

  PAGE_SIZE,
};
