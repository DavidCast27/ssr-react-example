const React = require('react');
const { useState } = require('react');
const SvgSearch = require('./svg-search');

require('./layout.scss');

function Layout() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="layout">
      <div className="layout-header">
        <div className="layout-nav">
          <a href="/">
            <div className="layout-nav-logo" />
          </a>
          <form className="layout-nav-search" action="/items" method="get">
            <input
              onChange={handleSearchTermChange}
              className="layout-nav-search-input"
              placeholder="Buscar productos, marcas y más..."
              maxLength="120"
            />
            <input type="hidden" value={searchTerm} name="search" />
            <button type="submit" className="layout-nav-search-btn">
              <div className="layout-nav-search-btn-icon">
                <SvgSearch />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

module.exports = Layout;
