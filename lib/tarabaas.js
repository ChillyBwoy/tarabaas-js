import { createRequest } from './request';
import { DEFAULT_OPTIONS } from './settings';

let instance = null;

export function init (settings = DEFAULT_OPTIONS) {
  const BASE_URL = `${settings.serverURL}/api`;

  if (!!instance) {
    return instance;
  }

  instance = {
    projects() {
      let projectsURL = `${BASE_URL}/projects`;

      return {
        all: () => createRequest({url: projectsURL}),
        get: (uuid) => {
          return {
            ...createRequest({url: `${projectsURL}/${uuid}`}),
            databases() {
              let databasesURL = `${projectsURL}/${uuid}/databases`;
              let itemsURL = `${BASE_URL}/clients/projects/${uuid}/databases`;

              return {
                all: () => createRequest({url: databasesURL}),
                get: (name) => {
                  return {
                    ...createRequest({url: `${databasesURL}/${name}`}),
                    listItems: () => createRequest({url: `${itemsURL}/${name}`}),
                    createItem: (payload = {}) => createRequest({
                      url: `${itemsURL}/${name}`,
                      params: {
                        method: 'POST',
                        mode: 'cors',
                        body: JSON.stringify(payload)
                      }
                    }),
                    destroyItem: (id) => createRequest({
                      url: `${itemsURL}/${name}/${id}/`,
                      params: {
                        method: 'DELETE',
                        mode: 'cors'
                      }
                    }),
                    updateItem: (id, payload) => createRequest({
                      url: `${itemsURL}/${name}/${id}/`,
                      params: {
                        method: 'PUT',
                        mode: 'cors',
                        body: JSON.stringify(payload)
                      }
                    })
                  }
                },
                create: (payload = {}) => createRequest({
                  url: databasesURL,
                  params: {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(payload)
                  }
                }),
                destroy: (name) => createRequest({
                  url: `${databasesURL}/${name}`,
                  params: {
                    method: 'DELETE',
                    mode: 'cors'
                  }
                })
              }
            }
          }
        },
        create: (payload = {}) => createRequest({
          url: projectsURL,
          params: {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({name: payload.name})
          }
        }),
        destroy: (uuid) => createRequest({
          url: `${projectsURL}/${uuid}`,
          params: {
            method: 'DELETE',
            mode: 'cors'
          }
        })
      };
    }
  };

  return instance;
};
