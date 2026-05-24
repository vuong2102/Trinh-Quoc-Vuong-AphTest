import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Col, Flex, Input, Row, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProductCategory } from "../redux/category";
import { categoryService } from "../services/categoryService";
import { AllProductLegacyStatic } from "./legacy/AllProductLegacyStatic";

function AllProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getListCategory();
        setCategories(data || []);
        dispatch(setProductCategory(data || []));
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const onSearch = async (e) => {
    if (e) {
      navigate(`/search?query=${e}`);
    }
  };

  const marketCategories = useMemo(
    () => categories.filter((cat) => cat.link !== "raw-materials"),
    [categories]
  );

  const productSections = useMemo(
    () =>
      categories
        .filter(
          (cat) => cat.children?.length && cat.link !== "raw-materials"
        )
        .sort((a, b) => {
          if (a.link === "sustainable-products") return -1;
          if (b.link === "sustainable-products") return 1;
          return 0;
        }),
    [categories]
  );

  const renderCategoryLink = (category) => (
    <Link
      to={`/category/${category.link}`}
      className="_8ahh block has-hover"
    >
      <div className="_4rfh image-zoom">
        <img
          src={category.thumb || "/images/website/market_1.png"}
          alt={category.categoryName}
          className="_5mgw"
        />
      </div>
      <div className="_1blc">
        <div className="_9wvo">{category.categoryName}</div>
        <div className="_4jqn">
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
        </div>
      </div>
    </Link>
  );

  const renderVerticalChild = (child) => (
    <div key={child.id} className="_6npx">
      <div className="_2jjl">
        <div className="_8ghs">
          <Link to={`/category/${child.link}`} className="block">
            <img
              src={child.thumb || "/images/website/image_discover_1.png"}
              alt={child.categoryName}
              className="_9rtu"
              onError={(e) => {
                e.currentTarget.src = "/images/website/product-list_1.png";
              }}
            />
          </Link>
        </div>
        <div className="_0cac">
          <div className="_9not">
            <div className="_2pzh">
              <Link to={`/category/${child.link}`}>{child.categoryName}</Link>
            </div>
            <div className="_8ynm textLine-5">{child.shortDesc}</div>
          </div>
          <div className="_3qdw">
            <Link
              to={`/category/${child.link}`}
              className="button button-outline-green"
            >
              <span>View products</span>
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGridChild = (child) => (
    <div key={child.id} className="_4euo">
      <div className="_8aey">
        <Link to={`/category/${child.link}`} className="block">
          <img
            src={child.thumb || "/images/website/consummer_1.png"}
            alt={child.categoryName}
            className="_1qlp"
          />
        </Link>
      </div>
      <div className="_3pxh">
        <div className="_0cvj">
          <Link to={`/category/${child.link}`} className="textLine-1">
            {child.categoryName}
          </Link>
        </div>
        <div className="_8gbl textLine-2">{child.shortDesc}</div>
        <div className="_4jqn">
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
        </div>
      </div>
    </div>
  );

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_all_product.mp4"
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
                          <span className="active-bread">All Products</span>
                        ),
                      },
                    ]}
                    id="breadcrumb"
                  />
                  <h2 className="_5xfq _1kly">All Products</h2>
                  <p className="_7vyg">
                    Discover our full range of eco-friendly and high-tech
                    plastic products designed for diverse industries. Engineered
                    with precision, tailored for your needs, and committed to a
                    greener future.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="seamy-sod section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Find What You’re Looking For</h2>
              </Col>
            </Row>
          </div>
          <div className="_9jvd">
            <Row gutter={30}>
              <Col span={24} className="_5czu RemovePaddingBottom">
                <Input.Search
                  placeholder="Input search text"
                  className="_8wts"
                  enterButton={
                    <div className="button-gradient">
                      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                      <span className="uppercase">Search</span>
                    </div>
                  }
                  onSearch={onSearch}
                />
              </Col>
            </Row>
          </div>
          <div className="_5kgp">
            <Row gutter={30}>
              <Col span={24} className="_5pqy RemovePaddingBottom">
                <Flex vertical gap={14}>
                  <div className="_4tma">KEYWORD SUGGESTION</div>
                  <Flex align="center" justify="center" gap={12} wrap="wrap">
                    <div className="_1hmm">
                      <Link to="/search?query=Food Packaging" className="_6dut">
                        Food Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link
                        to="/search?query=Consumer Packaging"
                        className="_6dut"
                      >
                        Consumer Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Food Wrap" className="_6dut">
                        Food Wrap
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link
                        to="/search?query=Masterbatch"
                        className="_6dut"
                      >
                        Masterbatch Compounds
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Compostable" className="_6dut">
                        Compostable
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="/search?query=Cutlery" className="_6dut">
                        Cutlery
                      </Link>
                    </div>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="dynamism-nib section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Choose a Market</h2>
              </Col>
            </Row>
          </div>
          <div className="_0odn catalog-spin-wrapper">
            <Spin spinning={loading}>
              {marketCategories.map((category) => (
                <div key={category.id} className="_3iwp">
                  {renderCategoryLink(category)}
                </div>
              ))}
            </Spin>
          </div>
        </div>
      </section>

      {productSections.map((category) => {
            const useVerticalLayout = category.children.length <= 2;
            const sectionClass = useVerticalLayout
              ? "fumed-ref section"
              : "zeros-vug section";
            return (
              <section key={category.id} className={sectionClass}>
                <div className="section-content relative">
                  <div className="_1nvi">
                    <Row gutter={30}>
                      <Col span={24} className="_5xem">
                        <p className="_5bmu">Our products</p>
                        <h3 className="_7kra">{category.categoryName}</h3>
                      </Col>
                    </Row>
                  </div>
                  {useVerticalLayout ? (
                    <div className="_5tcj">
                      {category.children.map(renderVerticalChild)}
                    </div>
                  ) : (
                    <div className="_5msj">
                      {category.children.map(renderGridChild)}
                    </div>
                  )}
                </div>
              </section>
            );
          })}

      {/* ORIGINAL STATIC UI — preserved in ./legacy/AllProductLegacyStatic.jsx
          Reason: Inline JSX caused parse errors (unclosed tags). Logic unchanged above. */}
      {/* {false && <AllProductLegacyStatic />} */}
    </div>
  );
}

export default AllProduct;
