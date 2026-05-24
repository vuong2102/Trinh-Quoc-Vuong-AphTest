import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
  Spin,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categoryService } from "../services/categoryService";
import { productService } from "../services/productService";
import { collectCategoryIds } from "../utils/categoryHelpers";

const PAGE_SIZE = productService.PAGE_SIZE;

function Category() {
  const { url } = useParams();

  // Bỏ cmt nếu bạn sử dụng phần này
  // const { productCategory } = useSelector((state) => state.category);

  const [form] = Form.useForm();

  // const [filterList, setFilterList] = useState([]);

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const categoryIds = useMemo(
    () => (category ? collectCategoryIds(category) : []),
    [category]
  );

  const filterList = category?.filterList || [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setPage(1);
    form.resetFields();
    setFilterData(undefined);
    setSubmitDisabled(true);
  }, [url, form]);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const data = await categoryService.getCategoryByUrl(url);
        setCategory(data);
      } catch (error) {
        console.error("Failed to load category:", error);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [url]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryIds.length) return;
      setLoading(true);
      try {
        const data = await productService.getProductByCategory(
          categoryIds,
          page
        );
        setProducts(data?.items || []);
        setTotalCount(data?.totalCount || 0);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchProducts();
  }, [category, categoryIds, page]);

  const onValuesChange = (_changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };

  /*  Hàm nối children và filterList được trả về từ API GetCategoryByUrl phục vụ cho chức năng lọc.
      Hãy bỏ comment nếu bạn sử dụng.
  */
  // const mergeFilterLists = (tree) => {
  //   // Lấy FilterList của node hiện tại
  //   let mergedList = [...(tree.filterList || [])];

  //   // Duyệt qua từng Children và hợp nhất FilterList
  //   if (tree.children && tree.children.length > 0) {
  //     tree.children.forEach((child) => {
  //       mergedList = mergedList.concat(mergeFilterLists(child));
  //     });
  //   }

  //   return mergedList;
  // };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      return;
    }

    let filters;
    Object.keys(values).forEach((key) => {
      if (
        values[key] &&
        values[key].length > 0 &&
        key !== "categories" &&
        key !== "textSearch"
      ) {
        filters = { ...filters, [key]: values[key] };
      }
    });

    /* VIẾT CODE CỦA BẠN VÀO ĐÂY — template gốc để trống.
       Đã triển khai: lưu filters vào state (filterData) để bật nút Clear Filters. */
    setFilterData(filters);
    setPage(1);
  };

  const clearFilters = () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
  };

  const renderFilterField = (filter) => {
    if (filter.key === "categories") {
      return (
        <Form.Item
          key={filter.key}
          label={filter.label}
          name="categories"
          className="widget_product_categories"
        >
          <Checkbox.Group className="form-group">
            {filter.options?.map((opt) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      );
    }

    if (filter.type === "range") {
      return (
        <Form.Item
          key={filter.key}
          label={filter.label}
          name={filter.key}
          className="widget_product_categories"
        >
          <Slider min={filter.min} max={filter.max} range />
        </Form.Item>
      );
    }

    if (filter.options) {
      return (
        <Form.Item
          key={filter.key}
          label={filter.label}
          name={filter.key}
          className="widget_product_categories"
        >
          <Checkbox.Group className="form-group">
            {filter.options.map((opt) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      );
    }

    return null;
  };

  const descriptionParagraphs = (category?.description || "")
    .split("\n")
    .filter(Boolean);

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_category_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <a href="/" className="item-bread">
                            Home
                          </a>
                        ),
                      },
                      {
                        title: (
                          <Link to="/all-product" className="item-bread">
                            All Products
                          </Link>
                        ),
                      },
                      {
                        title: (
                          <span className="active-bread">
                            {category?.categoryName || "..."}
                          </span>
                        ),
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">
                    {category?.categoryName || "Loading..."}
                  </h2>
                  <div className="_7vyg">
                    {descriptionParagraphs.length > 0 ? (
                      descriptionParagraphs.map((text, i) => (
                        <p key={i}>{text}</p>
                      ))
                    ) : (
                      <p>{category?.description}</p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="penury-gym section">
        <div className="section-content relative">
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                            disabled={!filterData}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    {filterList.map(renderFilterField)}

                    {!isSubmitDisabled && (
                      <Button type="link" htmlType="submit" className="filter">
                        Filter
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <Spin spinning={loading}>
                  <div className="_7mkr">
                    <h2 className="_3rac">
                      {category?.categoryName || "Products"}
                    </h2>
                  </div>
                  <div className="products">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {totalCount > 0 && (
                    <Pagination
                      current={page}
                      total={totalCount}
                      pageSize={PAGE_SIZE}
                      onChange={setPage}
                      className="pagination-cntt"
                    />
                  )}
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
      </section>


      {/* ========== ORIGINAL STATIC UI (penury-gym: filters, product grid, pagination) — template from initial commit.
        Reason: Replaced by API-driven category/product list above. ========== */}
      {/* {false && (
        <>
                <section className="penury-gym section">
                  <div className="section-content relative">
                    <div className="category-page-row">
                      <Row gutter={30}>
                        <Col span={6}>
                          <div className="product_sidebar_cate">
                            <Form
                              layout="vertical"
                              form={form}
                              onValuesChange={onValuesChange}
                              onFinish={onFilter}
                            >
                              <div className="_4get">
                                <div className="_4yee">
                                  <div className="_5tyu">Filters</div>
                                  <div className="_2wzq">
                                    <Button
                                      type="link"
                                      size="small"
                                      id="clear-filter"
                                      onClick={clearFilters}
                                      disabled={!filterData}
                                    >
                                      Clear Filters
                                    </Button>
                                  </div>
                                </div>
                                <Form.Item name="textSearch" className="_7pia">
                                  <Input
                                    placeholder="Search Products"
                                    className="_8jji"
                                    suffix={<SearchOutlined />}
                                  />
                                </Form.Item>
                              </div>
          
                              <Form.Item
                                label="Categories"
                                name="categories"
                                className="widget_product_categories"
                              >
                                <Checkbox.Group className="form-group">
                                  <Checkbox value={1}>Consumer Packaging</Checkbox>
                                  <Checkbox value={2}>Industrial Packaging</Checkbox>
                                </Checkbox.Group>
                              </Form.Item>
          
                              <Form.Item
                                label="Type of"
                                className="widget_product_categories"
                              >
                                <Checkbox.Group className="form-group">
                                  <Checkbox value={3}>Food Storage</Checkbox>
                                  <Checkbox value={4}>Trash Bags</Checkbox>
                                  <Checkbox value={5}>
                                    Knife ΓÇô Case ΓÇô Storage Box
                                  </Checkbox>
                                  <Checkbox value={6}>Containers</Checkbox>
                                  <Checkbox value={7}>Gloves</Checkbox>
                                </Checkbox.Group>
                              </Form.Item>
          
                              <Form.Item
                                label="Width (cm)"
                                className="widget_product_categories"
                              >
                                <Slider min={10} max={60} range />
                              </Form.Item>
          
                              <Form.Item
                                label="Length (cm)"
                                className="widget_product_categories"
                              >
                                <Slider min={20} max={120} range />
                              </Form.Item>
          
                              <Form.Item
                                label="Recycle"
                                className="widget_product_categories"
                              >
                                <Checkbox.Group className="form-group">
                                  <Checkbox value="Yes">Yes</Checkbox>
                                  <Checkbox value="No">No</Checkbox>
                                </Checkbox.Group>
                              </Form.Item>
          
                              {!isSubmitDisabled && (
                                <Button type="link" htmlType="submit" className="filter">
                                  Filter
                                </Button>
                              )}
                            </Form>
                          </div>
                        </Col>
          
                        <Col span={18}>
                          <div className="_7mkr">
                            <h2 className="_3rac">Consumer Packaging</h2>
                          </div>
                          <div className="products">
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_1.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Food Wrap
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_2.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Overlock Jumbo bag
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_1.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Food Wrap
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_2.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Overlock Jumbo bag
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_2.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Overlock Jumbo bag
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_1.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Food Wrap
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_2.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Overlock Jumbo bag
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_1.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Food Wrap
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col has-hover product">
                              <div className="col-inner">
                                <div className="box-product has-hover">
                                  <div className="box-image customer-box-image-product">
                                    <a href="#" className="_1gqs block image-zoom">
                                      <img
                                        src="/images/website/product-list_2.png"
                                        className="_8wjh"
                                      />
                                    </a>
                                  </div>
                                  <div className="box-text box-text-products text-left">
                                    <div className="title-wrapper">
                                      <h4 className="product-title">
                                        <a href="#" className="product_link">
                                          Overlock Jumbo bag
                                        </a>
                                      </h4>
                                      <p className="sku">
                                        SKU: <span>036897488221-2</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
          
                          <Pagination
                            defaultCurrent={1}
                            total={27}
                            defaultPageSize={9}
                            className="pagination-cntt"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </section>
        </>
      )} */}

      <section className="lichen-gel section">
        <div className="section-content relative">
          <div className="_2gia">
            <Row gutter={60}>
              <Col span={12}>
                <div className="text-box_image">
                  <p className="_0kce">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    Through a journey of establishment and continuous
                    development, An Phat Holdings has emerged as the leading
                    high-tech, environmentally friendly plastics group in
                    Southeast Asia. With over 20 years of experience, we are
                    dedicated to delivering high-quality, sustainable products
                    across a wide range of industries. As the region’s foremost
                    innovator in eco-friendly plastic solutions, we have built a
                    strong reputation and successfully expanded our presence
                    into key global markets, including Europe, the Americas, the
                    UAE, Japan, Korea, Singapore, Taiwan, and the Philippines.
                    Driven by ongoing research, innovation, and creativity, we
                    are committed to creating enduring value for our customers,
                    investors, and employees.
                  </p>
                  <div className="_3qdw">
                    <a className="button button-outline-green" href="/catalog">
                      <span>Our Catalogs</span>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="image-box_image">
                  <img src="/images/website/explore.png" className="_6ikc" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;
