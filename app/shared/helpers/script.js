const React = require('react');
const PropTypes = require('prop-types');

const Script = (props) => {
  const { children, src } = props;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: children
          ? `<script>${children}</script>`
          : `<script src="${src}"></script>`,
      }}
    />
  );
};

Script.propTypes = {
  children: PropTypes.string,
  src: PropTypes.string,
};

Script.defaultProps = {
  children: '',
  src: '',
};

module.exports = Script;
