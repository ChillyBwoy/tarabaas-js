export function createRequest (state) {
  return {
    commit() {
      let {url, params={}} = state;
      return fetch(url, params)
        .then(r => r.json());
    },

    payload() {
      return state;
    }
  }
};
