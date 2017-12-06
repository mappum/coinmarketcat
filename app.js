var html = require('choo/html')
var choo = require('choo')
var css = require('sheetify')
var request = require('request')

var app = choo()
// app.use(catStore)
app.route('/', mainView)
app.mount('body')

css('bootstrap/dist/css/bootstrap.css')
css`
  body {
    font-size: 16px;
    font-family: sans-serif;
  }

  th:first-child, td:first-child {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  tbody > tr {
    height: 63px;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
  }

  tbody > tr > td {
    padding: 6px;
    vertical-align: middle !important;
  }
`
document.head.appendChild(html`
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
`)

function mainView (state, emit) {
  return html`
    <body>
      ${header()}
      ${main()}
    </body>
  `
}

function header () {
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
            Cattributes: <b><a href="#">123</a></b>
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

function main () {
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
          <div class="table-fixed-column-mobile compact-name-column">
            <table class="table no-footer dataTable" role="grid" style="margin-left: 0px; width: 940px;">
              <thead>
                <tr role="row" style="height: 35px; border-top: 1px solid #ddd; font-size: 12px">
                  <th class="text-center" rowspan="1" colspan="1" style="width: 40px;" aria-label="#">#</th>
                  <th tabindex="0" rowspan="1" colspan="1" style="width: 115px;" aria-label="Name: activate to sort column ascending">Name</th>
                  <th style="white-space: nowrap;" class="text-right" data-mobile-text="M. Cap" tabindex="0" aria-controls="currencies" rowspan="1" colspan="1" style="width: 120px;" aria-label="M. Cap: activate to sort column descending">Avg Price / Avg Gen Price</th>
                  <th class="text-right" data-mobile-text="Volume" tabindex="0" aria-controls="currencies" rowspan="1" colspan="1" style="width: 113px;" aria-label="Volume: activate to sort column descending">Volume (24h)</th>
                  <th class="text-right" title="The number of coins in existence available to the public" data-mobile-text="Supply" tabindex="0" aria-controls="currencies" rowspan="1" colspan="1" style="width: 154px;" aria-label="Supply: activate to sort column descending"># Cats</th>
                  <th class="text-right" data-mobile-text="Change" tabindex="0" aria-controls="currencies" rowspan="1" colspan="1" style="width: 109px;" aria-label="Change: activate to sort column descending">Change (24h)</th>
                  <th rowspan="1" colspan="1" style="width: 205px;" aria-label="Price Graph (7d)">Price Graph (7d)</th>
                </tr>
              </thead>
              <tbody>
                ${tableRow({ name: 'Gold' })}
              </tbody>
            </table>
          </div>
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

//
// function catStore (state, emitter) {
//   state.loading = true
//
//   request('https://api.catstats.io/prices/cattributes', (err, res) => {
//     if (err) {
//       // TODO: add error to state to tell user there was an error
//       return console.log(error.stack)
//     }
//
//     state.generations = JSON.parse(res.body)
//     state.loading = false
//     emitter.emit('render') //rebuild html whatever page you're on
//   })
// }
