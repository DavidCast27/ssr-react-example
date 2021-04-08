const React = require('react');
const serialize = require('serialize-javascript');

const Script = require('../helpers/script');
const Layout = require('../commons/layout');
const SvgChevron = require('../commons/svg-chevron');

const Vip = (props) => {
  const serializeProps = { itemData: props.itemData };
  const { item } = props.itemData;
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true,
        })};`}
      </Script>
      <Layout />
      {item && (
        <div className="item">
          <div className="item-breadcrumb">
            <div className="item-breadcrumb__path">
              <ol>
                {item.categories.map(breadcrumbItem => (
                  <li key={breadcrumbItem.id}>
                    {breadcrumbItem.name}
                    <SvgChevron />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="item-container">
            <div className="item-container__left">
              <div className="item-container__left__picture">
                <img src={item.picture} alt={item.title} />
              </div>
              <div className="item-container__left__description">
                <h2 className="item-container__left__description__title">
                  Descripción
                </h2>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="item-container__details">
              <div className="item-container__details__condition">
                {item.condition === 'new' ? 'Nuevo' : 'Usado'}
                {item.sold_quantity > 0 && ` - ${item.sold_quantity} vendidos`}
              </div>
              <h2 className="item-container__details__title">{item.title}</h2>
              <div className="item-container__details__price">
                {item.price.currency}
                {' '}
                $
                {item.price.amount}
                {item.price.decimals > 0 && <sup>{item.price.decimals}</sup>}
              </div>
              {item.free_shipping && (
                <div className="item-container__details__fs">Envío gratis</div>
              )}
              <a href="#">
                <div className="item-container__details__buy">Comprar</div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

module.exports = Vip;
