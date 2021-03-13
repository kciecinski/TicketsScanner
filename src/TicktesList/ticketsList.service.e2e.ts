export const getTickets = async () =>
  await new Promise((resolve, reject) => {
    resolve(
      JSON.parse(
        '[{"id":3,"date":"2020-12-28T20:15:00.000Z","first_name":"Daga","last_name":"Lewandowka","active":true,"event_name":"Koncert Jusina Biebera","created_at":"2020-12-28T21:10:44.234Z","updated_at":"2020-12-28T21:11:36.095Z","url":"https://evening-river-23445.herokuapp.com/tickets/3.json"},{"id":4,"date":"2021-01-06T21:20:00.000Z","first_name":"as","last_name":"rrr","active":false,"event_name":"Mecz","created_at":"2021-01-06T21:20:06.699Z","updated_at":"2021-01-12T21:03:00.189Z","url":"https://evening-river-23445.herokuapp.com/tickets/4.json"}',
      ),
    );
    reject(JSON.parse('{"status":404,"error":"Not Found"}'));
  });
