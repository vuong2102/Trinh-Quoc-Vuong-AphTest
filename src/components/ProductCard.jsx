import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col has-hover product">
      <div className="col-inner">
        <div className="box-product has-hover">
          <div className="box-image customer-box-image-product">
            <Link
              to={`/product/${product.slug}`}
              className="_1gqs block image-zoom"
            >
              <img
                src={product.thumb || "/images/website/product-list_1.png"}
                alt={product.prodName}
                className="_8wjh"
              />
            </Link>
          </div>
          <div className="box-text box-text-products text-left">
            <div className="title-wrapper">
              <h4 className="product-title">
                <Link to={`/product/${product.slug}`} className="product_link">
                  {product.prodName}
                </Link>
              </h4>
              <p className="sku">
                SKU: <span>{product.sku}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
