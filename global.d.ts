declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

export {};

fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'shahbaz', password: '123' })
}).then(r => r.json()).then(console.log);