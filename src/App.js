import './App.css';



function GetIP(props) {
  let url = ""
  let ipAddr = ""

  //checks which IP version is passed in
  if (props.type == 'IPV4') {
    url = "https://api.ipify.org?format=json";
    console.log('4');
  } else if (props.type == 'IPV6') {
    url = "https://api64.ipify.org?format=json";
    console.log('6');
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(url);
      console.log(data.ip);
      ipAddr = data.ip;
      //appends ip if not already displayed on page
      if (!document.getElementsByClassName('IPsection')[0].innerHTML.includes('IPV6') || !document.getElementsByClassName('IPsection')[0].innerHTML.includes('IPV4')) {
        document.getElementsByClassName('IPsection')[0].innerHTML += '<h3>' + props.type + ': ' + ipAddr + '</h3>';
      };
    }
    );

}

function DisplayLatency(props) {
  //open websocket to  ws://localhost:55455 from pylon
  var W3CWebSocket = require('websocket').w3cwebsocket;
  var W3CWebSocket = require('websocket').w3cwebsocket;

  var client = new W3CWebSocket('ws://localhost:55455/');

  //console messages depending on outcome of connection
  client.onerror = function () {
    console.log('Connection Error');
  };

  client.onopen = function () {
    console.log('WebSocket Client Connected');
  };

  client.onclose = function () {
    console.log('echo-protocol Client Closed');
  };

  client.onmessage = function (e) {
    if (typeof e.data === 'string') {
      //calculate time difference between server and client
      const d = new Date();
      let clientTime = d.getTime();
      console.log("Client: " + clientTime);
      console.log("Server: " + e.data);
      var latency = clientTime - parseInt(e.data);

      //change value if it's different to the current value displayed
      if (!document.getElementsByClassName('LatencyVal')[0].innerHTML.includes(latency)) {
        document.getElementsByClassName('LatencyVal')[0].innerHTML = '<h3>Latency: ' + latency + 'ms</h3>';
      }
    }
  };

}



function App() {
  //defining divs
  const banner = <div className='Banner'><h1>Sextant App</h1></div>;
  const exhibit = (
    <div className='Exhibit'>
      <div className='IPsection'>
        <h2><u>IP Addresses</u></h2>
        {<GetIP type='IPV4' />}
        {<GetIP type='IPV6' />}
      </div>
      <div className='Latency'>
        <h2><u>Live Latency</u></h2>
        <div className='LatencyVal'>
          {DisplayLatency()}
        </div>

      </div>
    </div>

  );
  return (
    //displays divs on web page
    <div className="App">
      {banner}
      {exhibit}
    </div>
  );
}

export default App;
