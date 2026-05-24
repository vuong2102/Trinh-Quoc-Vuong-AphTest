import cors from "cors";
import express from "express";
import {
  categories,
  filterListTemplate,
  products,
} from "./data/mockData.js";

const app = express();
const PORT = 8081;
const PAGE_SIZE = 9;

app.use(cors());
app.use(express.json());

const wrap = (data) => ({ result: data });

function findCategoryByUrl(url, list = categories) {
  for (const cat of list) {
    if (cat.link === url) return cat;
    if (cat.children?.length) {
      const found = findCategoryByUrl(url, cat.children);
      if (found) return found;
    }
  }
  return null;
}

function collectCategoryIds(category) {
  const ids = [category.id];
  if (category.children?.length) {
    category.children.forEach((child) => {
      ids.push(...collectCategoryIds(child));
    });
  }
  return ids;
}

function flattenCategories(list = categories, result = []) {
  list.forEach((cat) => {
    result.push(cat);
    if (cat.children?.length) flattenCategories(cat.children, result);
  });
  return result;
}

function getProductsByCategoryIds(ids, page = 1) {
  const filtered = products.filter((p) =>
    p.categoryIds.some((cid) => ids.includes(cid))
  );
  const start = (page - 1) * PAGE_SIZE;
  return {
    items: filtered.slice(start, start + PAGE_SIZE).map(toProductListItem),
    totalCount: filtered.length,
  };
}

function toProductListItem(p) {
  return {
    id: p.id,
    thumb: p.thumb,
    prodName: p.prodName,
    slug: p.slug,
    sku: p.sku,
  };
}

function searchProducts(query) {
  const q = (query || "").toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.prodName.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
  );
}

// GET /Category/GetListCategory
app.get("/api/Category/GetListCategory", (req, res) => {
  const { lang = "en" } = req.query;
  if (lang !== "en") {
    return res.status(400).json({ error: { message: "Unsupported language" } });
  }
  res.json(wrap(categories));
});

// GET /Category/GetCategoryByUrl
app.get("/api/Category/GetCategoryByUrl", (req, res) => {
  const { lang = "en", url } = req.query;
  if (!url) {
    return res.status(400).json({ error: { message: "url is required" } });
  }
  const category = findCategoryByUrl(url);
  if (!category) {
    return res.status(404).json({ error: { message: "Category not found" } });
  }
  const childCategories = flattenCategories(category.children || []).filter(
    (c) => c.parentId === category.id
  );
  res.json(
    wrap({
      id: category.id,
      thumb: category.thumb || "",
      categoryName: category.categoryName,
      description: category.description || category.shortDesc || "",
      children: (category.children || []).map((c) => ({
        id: c.id,
        categoryName: c.categoryName,
        link: c.link,
        thumb: c.thumb,
        children: c.children || [],
      })),
      filterList: [
        {
          key: "categories",
          label: "Categories",
          options: [
            { value: category.id, label: category.categoryName },
            ...childCategories.map((c) => ({
              value: c.id,
              label: c.categoryName,
            })),
          ],
        },
        ...filterListTemplate,
      ],
    })
  );
});

// GET /Product/GetProductByCategory
app.get("/api/Product/GetProductByCategory", (req, res) => {
  let ids = req.query.ids;
  const page = parseInt(req.query.page, 10) || 1;

  if (typeof ids === "string") {
    try {
      ids = JSON.parse(ids);
    } catch {
      ids = ids.split(",").map(Number);
    }
  }
  if (!Array.isArray(ids)) {
    ids = [Number(ids)].filter(Boolean);
  }

  res.json(wrap(getProductsByCategoryIds(ids.map(Number), page)));
});

// GET /Product/GetProductByUrl
app.get("/api/Product/GetProductByUrl", (req, res) => {
  const { url } = req.query;
  const product = products.find((p) => p.slug === url);
  if (!product) {
    return res.status(404).json({ error: { message: "Product not found" } });
  }
  res.json(
    wrap({
      id: product.id,
      thumb: product.thumb,
      prodName: product.prodName,
      shortDesc: product.shortDesc,
      description: product.description,
      specification: product.specification,
      sku: product.sku,
      dataSheet: product.dataSheet,
      media: product.media?.length ? product.media : [product.thumb],
    })
  );
});

// GET /Product/GetRelatedProducts
app.get("/api/Product/GetRelatedProducts", (req, res) => {
  const productId = parseInt(req.query.id, 10);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.json(wrap([]));
  }
  const related = products
    .filter(
      (p) =>
        p.id !== productId &&
        p.categoryIds.some((cid) => product.categoryIds.includes(cid))
    )
    .slice(0, 6)
    .map(toProductListItem);
  res.json(wrap(related));
});

// GET /Product/SearchProducts
app.get("/api/Product/SearchProducts", (req, res) => {
  const { query = "" } = req.query;
  const matched = searchProducts(query);
  const categoryIds = new Set();
  matched.forEach((p) => p.categoryIds.forEach((id) => categoryIds.add(id)));

  const allFlat = flattenCategories();
  const matchedCategories = allFlat
    .filter((c) => categoryIds.has(c.id))
    .map((c) => ({ id: c.id, categoryName: c.categoryName }));

  res.json(
    wrap({
      products: matched.map(toProductListItem),
      categories: matchedCategories,
      filters: filterListTemplate,
    })
  );
});

// POST /Product/FilterSearchProduct
app.post("/api/Product/FilterSearchProduct", (req, res) => {
  const {
    textSearch = "",
    categories: categoryFilter = [],
    page = 1,
  } = req.body;

  let matched = searchProducts(textSearch);

  if (categoryFilter.length > 0) {
    const ids = categoryFilter.map(Number);
    matched = matched.filter((p) =>
      p.categoryIds.some((cid) => ids.includes(cid))
    );
  }

  const start = (parseInt(page, 10) - 1) * PAGE_SIZE;
  res.json(
    wrap({
      items: matched.slice(start, start + PAGE_SIZE).map(toProductListItem),
      totalCount: matched.length,
    })
  );
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}/api`);
});
