var CrossTabClient = require('logux-client/cross-tab-client')

var user = document.querySelector('meta[name=user]')
var token = document.querySelector('meta[name=token]')
var server = document.querySelector('meta[name=server]')

var logux = new CrossTabClient({
  credentials: token.content,
  subprotocol: '1.0.0',
  userId: user.content,
  url: server.content
})
logux.start()

var submit = document.getElementById('the-button')

submit.addEventListener('click', function () {
  logux.log.add({
    type: 'CLICK'
  })
}, false)

logux.on('add', function (action, meta) {
  if (action.type === 'CLICK') {
    var li = document.createElement('li')
    li.innerHTML = 'CLICK'
    document.getElementById('content').appendChild(li)
  }
})
