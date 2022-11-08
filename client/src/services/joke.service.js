const axios = require('axios');
const jokesApi = "http://localhost:8080/api/jokes/";

class JokeDataService {
  getAll = async () => {
    const res = await axios
      .get(jokesApi)
      .then(res => res.data);
    return res;
  }

  get = async (id) => {
    const res = await axios
      .get(jokesApi + `${id}`)
      .then(res => res.data);
    return res;
  }

  create(data) {
    console.log("Data: " + data);
    const res = fetch(jokesApi, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: { data }
    })
      .then(res => res)
    return res;
  }

  update(id, data) {
    const res = fetch(jokesApi + `${id}`, {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: { data }
    })
      .then(res => {
        console.log("RES: " + res);
        return res.data;
      })
    return res;
  }

  delete(id) {
    const res = fetch(jokesApi + `${id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res)
    return res;
  }

  //   findByTitle(title) {
  //     return http.get(`/jokes?title=${title}`);
  //   }
}

export default new JokeDataService();