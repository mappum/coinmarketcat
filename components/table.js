let html = require('choo/html')
let table = require('./table.js')
let Chart = require('chart.js')

module.exports = function (cattributes) {
  cattributes.sort((a, b) => b.multiplier - a.multiplier)
  return html`
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
          ${cattributes.map(row)}
        </tbody>
      </table>
    </div>
  `
}

function row (cattribute, i) {
  return html`
    <tr class="odd" role="row" style="height: 63px;">
      <td class="text-center sorting_1">${i + 1}</td>
      <td class="no-wrap cattribute-name">
        <a class="cattribute-name-container" href="#">${cattribute.name}</a>
      </td>
      <td class="no-wrap market-cap text-right" data-usd="2.16886492313e+11" data-btc="16724487.0">${cattribute.multiplier.toFixed(3)}x</td>
      <td class="no-wrap text-right">
          <a href="/currencies/bitcoin/#markets" class="price" data-usd="12968.2" data-btc="1.0">${cattribute.volume || 0} ETH</a>
      </td>
      <td class="no-wrap text-right circulating-supply">
        <span data-supply-container="">${cattribute.cats || 0}</span>
      </td>
      <td class="no-wrap percent-24h   text-right positive_change" data-usd="9.19" data-btc="0.00">${(cattribute.changePercent || 0).toFixed(2)}%</td>
      <td>${chart(cattribute)}</td>
    </tr>
  `
}

function chart (cattribute) {
  let data = [12, 19, 30, 15, 12, 13, 12, 19, 38, 15, 12, 13, 12, 19, 30, 15, 12, 13]

  let el = html`<canvas
    height="50"
    width="166"
    style="border: 1px solid black">
    </canvas>`
  let ctx = el.getContext('2d')
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: new Array(18),
      datasets: [{
        data,
        borderColor: '#E3CB7C',
        borderWidth: 2.5,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        lineTension: 0,
        fill: false
      }]
    },
    options: {
      responsive: false,
      elements: { point: { radius: 0 } },
      legend: { display: false },
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{
          display: false,
          offset: false,
          ticks: { min: Math.min(...data) }
        }]
      }
    }
  })
  return el
}
