let html = require('choo/html')
let table = require('./table.js')

module.exports = function (cattributes) {
  let titleStyle = `
    text-align: center;
    font-size: 36px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: normal;
    font-family: 'Raleway','Helvetica Neue',Helvetica,Arial,sans-serif;
  `
  return html`
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <h1 style=${titleStyle}>CryptoKitties Meowket Capitalizations</h1>
          <hr style="margin: 10px" />
          <nav class="navbar desktop navbar-default hidden-xs row">
            <div class="collapse navbar-collapse col-sm-7">
              <ul class="nav navbar-nav">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Market Cat <span class="caret"></span></a>
                </li>
              </ul>
            </div>
            <div class="navbar-form navbar-right quick-search-container" role="search" style="width: 35%">
              <div class="form-group" style="width: 80%">
                <span class="twitter-typeahead"
                  style="position: relative; display: inline-block; direction: ltr; width: 98%">
                    <input class="form-control quick-search-box js-quick-search tt-input" placeholder="Search doesn't work yet" name="q" autocomplete="off" spellcheck="false" style="position: relative; vertical-align: top; width: 100%" dir="auto" type="text"><pre aria-hidden="true" style="position: absolute; visibility: hidden; white-space: pre; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: optimizelegibility; text-transform: none; width: 100%"></pre><span class="tt-dropdown-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none; right: auto;"><div class="tt-dataset-currencies"></div></span></span>
                <button class="btn btn-primary hidden-sm hidden-md hidden-lg" type="submit" style="widht: 10%;"><i class="glyphicon glyphicon-search"></i></button>
              </div>
              <button class="btn btn-primary hidden-xs">
                <b>?</b>
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="row"></div>
          ${table(cattributes)}
        </div>
      </div>
    </div>
  `
}

function tableRow (cattribute) {
  return html`
  <tr id="id-bitcoin" class="odd" role="row" style="height: 63px;">
      <td class="text-center sorting_1">1</td>
      <td class="no-wrap cattribute-name">
        <div class="cattribute-logo-sprite"></div>
        <a class="cattribute-name-container" href="#">${cattribute.name}</a>
      </td>

      <td class="no-wrap market-cap text-right" data-usd="2.16886492313e+11" data-btc="16724487.0">1.245x</td>
      <td class="no-wrap text-right">
          <a href="/currencies/bitcoin/#markets" class="price" data-usd="12968.2" data-btc="1.0">$12,968.20</a>
      </td>
      <td class="no-wrap text-right circulating-supply">
        <a href="http://blockchain.info" target="_blank" data-supply="16724487.0">
          <span data-supply-container="">16,724,487</span>
           <span class="hidden-xs">BTC</span>
          </a>
      </td>
      <td class="no-wrap percent-24h   text-right positive_change" data-usd="9.19" data-btc="0.00">9.19%</td>
      <td><a href="/currencies/bitcoin/#charts"><img class="sparkline" alt="sparkline" src="https://files.coinmarketcap.com/generated/sparklines/1.png"></a></td>
  </tr>
  `
}
