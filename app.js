let html = require('choo/html')
let choo = require('choo')
let css = require('sheetify')
let request = require('request')

let header = require('./components/header.js')
let main = require('./components/main.js')

let app = choo()
app.use(statStore)
app.route('/', mainView)

loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js')
  .then(() => app.mount('body'))

css('bootstrap/dist/css/bootstrap.css')
css`
  body {
    font-size: 16px;
    font-family: sans-serif;
  }
`
document.head.appendChild(html`
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway" />
`)
document.head.appendChild(html`
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M75J38P');</script>
`)

function mainView (state, emit) {
  return html`
    <body>
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M75J38P"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
      ${header(state.cattributes, state.dailyData)}
      ${main(state.cattributes)}
    </body>
  `
}


function statStore (state, emitter) {
  state.loading = true
  state.cattributes = []

  request('https://api.catstats.io/prices', (err, res) => {
    if (err) {
      // TODO: add error to state to tell user there was an error
      return console.log(error.stack)
    }
    state.dailyData = JSON.parse(res.body)

    request('https://api.catstats.io/prices/cattributes', (err, res) => {
      if (err) {
        // TODO: add error to state to tell user there was an error
        return console.log(error.stack)
      }
      state.priceData = JSON.parse(res.body)

      request('https://api.catstats.io/stats/cattributes', (err, res) => {
        if (err) {
          // TODO: add error to state to tell user there was an error
          return console.log(error.stack)
        }

        state.loading = false
        state.catData = JSON.parse(res.body)
        state.cattributes = getCattributeRows(state.priceData, state.catData)

        emitter.emit('render') //rebuild html whatever page you're on
      })
    })
  })
}

function getCattributeRows (priceData, catData) {
  let cattributes = {}
  for (let cattr in priceData.today[0].stats) {
    if (cattr === '[object Object]') continue

    let today = priceData.today[0].stats[cattr]

    let week = []
    for (let period of priceData.week) {
      let point = period.stats[cattr] || {}
      week.push(point.average || null)
    }

    let getMult = (i) => {
      for (let j = i; j < week.length; j++) {
        if (week[j]) return week[j]
      }
      return 0.001
    }
    let multiplier = getMult(1)
    let prevMultiplier = getMult(1 + 24 / 6)
    let percentChange = ((multiplier - prevMultiplier) / prevMultiplier) * 100

    cattributes[cattr] = {
      dailyVolume: today.sum,
      dailyTrades: today.count,
      weeklyMultipliers: week.reverse(),
      multiplier,
      percentChange,
      count: catData[cattr]
    }
  }

  return Object.entries(cattributes)
    .map(([ name, data ]) => Object.assign(data, { name }))
}

function loadScript (src, integrity) {
  document ? document : null;
  return new Promise((resolve) => {
    let el = html`
      <script
        src="${src}"
        crossorigin="anonymous"
        ></script>
    `
    el.onload = resolve
    document.head.appendChild(el)
  })
}
