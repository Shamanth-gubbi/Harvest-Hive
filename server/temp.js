const axios = require('axios')
// Make request
axios.get('http://localhost:3000/coustomer')
  // Show response data
.then(res => console.log(res.data))
.catch(err => console.log(err))

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}