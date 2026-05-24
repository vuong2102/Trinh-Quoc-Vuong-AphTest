import axiosClient from "./interceptor";

const LANG = "en";

export const categoryService = {
  getListCategory() {
    return axiosClient.get("/Category/GetListCategory", {
      params: { lang: LANG },
    });
  },

  getCategoryByUrl(url) {
    return axiosClient.get("/Category/GetCategoryByUrl", {
      params: { lang: LANG, url },
    });
  },
};
