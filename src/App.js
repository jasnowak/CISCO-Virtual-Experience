import './App.css';

function GetIP(props) {
  let url = ""
  let ipAddr = ""
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
      if (!document.getElementsByClassName('IPsection')[0].innerHTML.includes('IPV6')) {
      document.getElementsByClassName('IPsection')[0].innerHTML += '<h1>' + props.type + ': ' + ipAddr + '</h1>';
      };
    }
    );

}


function App() {
  const banner = <h1>Sextant App</h1>;
  const exhibit = (
    <div className='IPsection'>
      {<GetIP type='IPV4' />}
      {<GetIP type='IPV6' />}
    </div>
  );
  return (
    <div className="App">
      {banner}
      {exhibit}
    </div>
  );
}

export default App;
