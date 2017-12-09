let html = require('choo/html')

module.exports = function (cattributes) {
  let outerStyle = `
    background-color: #f8f8f8;
    border-bottom: 1px solid #e7e7e7;
    height: 52px;
  `
  let containerStyle = `
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 6px;
  `
  return html`
    <div style=${outerStyle}>
      <div class="container" style=${containerStyle}>
        <div class="row">
          <div class="col-sm-3 small">
            Cattributes: <b><a href="#">${cattributes.length}</a></b>
          </div>
          <div class="col-sm-6 small text-center">
            <span>24h Vol: <b><a href="#">$10,000,000</a></b></span>
            <br>
            <span>/ Dead Birds: <b><a href="#">Over 9,000</a></b></span>
            <span> / Genesis Cat: <b><a href="#">v expensive</a></b></span>
          </div>
        </div>
      </div>
    </div>
  `
}
