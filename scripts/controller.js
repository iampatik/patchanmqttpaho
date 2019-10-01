//for broker
var btnConnect = document.getElementById('connect');
var btnDisconnect = document.getElementById('disconnect');
var btnStatus = document.getElementById('status');

//for publishing
var btnPublish = document.getElementById('publish');
var pubTopic = document.getElementById('pubTopic');
var pubPayload = document.getElementById('pubPayload');

//subscribing
var subTopic = document.getElementById('subTopic');
var btnSubscribe = document.getElementById('btnSubscribe');
var btnUnsubscribe = document.getElementById('btnUnsubscribe');

// basic functionalities

btnConnect.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Connecting..");
  client = mqtt.connect(document.getElementById('address').value)
  console.log(document.getElementById('address').value);

  client.on("connect", function () {
    console.log("Successfully connected");
    btnStatus.disabled = false;
    btnDisconnect.disabled = false;
    btnConnect.disabled = true;
    btnStatus.setAttribute('value', 'Connected successfully!')
    btnStatus.setAttribute('class', 'btn btn-success')
  })

  client.on("message", function (topic, payload) {
    console.log('on message')
    console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    let tbl = document.getElementById('pubReceiver');
    let tbody2 = document.getElementById('tbReceive');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(topic));
    msgPayload.appendChild(document.createTextNode(payload));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody2.appendChild(tr);
    console.log(tbl)
  })

  btnDisconnect.addEventListener("click", function (e) {
    client.end();
    btnStatus.disabled = true;
    btnDisconnect.disabled = true;
    btnConnect.disabled = false;
    console.log('Disconnected');
    btnStatus.setAttribute('value', 'Disconnected successfully!')
    btnStatus.setAttribute('class', 'btn btn-warning')
  })

  btnPublish.addEventListener("click", function (e) {
    e.preventDefault();
    client.publish(document.getElementById('pubTopic').value, document.getElementById('pubPayload').value)
    console.log("Published { topic: " + document.getElementById('pubTopic').value
      + "; payload: " + document.getElementById('pubPayload').value + " }");
    let tbl = document.getElementById('pubReceiver');
    let tbody = document.getElementById('tbPublish');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(document.getElementById('pubTopic').value));
    msgPayload.appendChild(document.createTextNode(document.getElementById('pubPayload').value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    // console.log(document.getElementById('pub-topic').value);
    // console.log(document.getElementById('pub-payload').value);
  })

  btnSubscribe.addEventListener("click", function (e) {
    // console.log("subscribe");
    // client.subscribe("mqtt/demo");
    e.preventDefault();
    client.subscribe(document.getElementById('subTopic').value);
    console.log("Subscribe { topic: " + document.getElementById('subTopic').value + " }");
    let tbl = document.getElementById('topicReceiver');
    let tbody = document.getElementById('tbSub');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(document.getElementById('subTopic').value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    btnUnsubscribe.disabled = false;
    btnSubscribe.disabled = true;
  })

  btnUnsubscribe.addEventListener("click", function (e) {
    client.unsubscribe(document.getElementById('subTopic').value);
    console.log("Unsubscribe { topic: " + document.getElementById('subTopic').value + " }");
    btnUnsubscribe.disabled = true;
    btnSubscribe.disabled = false;
  })

})



