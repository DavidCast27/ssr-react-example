const React = require('react');
const serialize = require('serialize-javascript');
const PropTypes = require('prop-types');

const Script = require('../helpers/script');
const Layout = require('../commons/layout');
const SvgChevron = require('../commons/svg-chevron');


const Search = ({ items, categories }) => {
  const serializeProps = { items, categories };
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true,
        })};`}
      </Script>
      <Layout />
      <div className="search">
        <div className="item-list">
          <div className="item-list-left">
            <div className="item-list-breadcrumb__path">
              <ol>
                {categories.map(breadcrumbItem => (
                  <li key={breadcrumbItem.id}>
                    {breadcrumbItem.name}
                    <SvgChevron />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <section className="item-list-right">
            {items
              && items.map(item => (
                <div key={item.id} className="item-list-item">
                  <a
                    href={`/items/${item.id}`}
                    className="item-list-item__picture"
                  >
                    <img src={item.picture} alt={item.title} />
                  </a>
                  <div className="item-list-item__container">
                    <a
                      href={`/items/${item.id}`}
                      className="item-list-item__container__title"
                    >
                      {item.title}
                    </a>
                    <div className="item-list-item__container__price">
                      {item.price.currency}
                      {' '}
                      $
                      {item.price.amount}
                      {item.price.decimals > 0 && (
                        <sup>{item.price.decimals}</sup>
                      )}
                    </div>
                    {item.free_shipping && (
                      <div className="item-list-item__container__fs">
                        Envío gratis
                      </div>
                    )}
                    {item.condition !== 'new' && (
                      <div className="item-list-item__container__condition">
                        Usado
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Search.defaultProps = {
  categories: null,
};

module.exports = Search;
