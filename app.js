let html = require('choo/html')
let choo = require('choo')
let css = require('sheetify')
let request = require('request')

let header = require('./components/header.js')
let main = require('./components/main.js')

let app = choo()
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
  let cattributes = [
    {name:'Gold', multiplier:2.4},
    {name:'Whixtensions',multiplier:11.13}
  ]
  return html`
    <body>
      ${header(cattributes)}
      ${main(cattributes)}
    </body>
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
