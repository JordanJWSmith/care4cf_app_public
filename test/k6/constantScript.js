import http from 'k6/http';

export let options = {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: 1000,
        iterations: 20,
        maxDuration: '1h30m',
      },
    },
  };

  export default function () {
    http.get('https://care4cf.azurewebsites.net');
  }
