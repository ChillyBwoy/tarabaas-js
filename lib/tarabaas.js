import fetch from 'isomorphic-fetch';

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
      let state = {
        url: `${BASE_URL}/projects`
      };

      return {
        // GET https://tarabaas.com/api/projects/
        all() {
          return createRequest(state);
        },

        // GET https://tarabaas.com/api/projects/<project_uuid>
        get(uuid) {
          state = {
            ...state,
            url: `${state.url}/${uuid}`
          };

          return {
            ...createRequest(state),
            databases() {
              state = {
                ...state,
                url: `${state.url}/databases`
              };

              return {
                // GET https://tarabaas.com/api/projects/<project_uuid>/databases
                all() {
                  return createRequest(state);
                },

                // GET https://tarabaas.com/api/projects/<project_uuid>/databases/<database_name>
                get(name) {
                  return createRequest({
                    ...state,
                    url: `${state.url}/${name}`
                  });
                },

                // POST https://tarabaas.com/api/projects/<project_uuid>/databases \
                // -d '{"name": "test", "schema_fields": [{"name": "name", "type": "string"}, {"name": "email", "type": "string"}]}'
                create(payload = {}) {
                  return createRequest({
                    ...state,
                    params: {
                      method: 'POST',
                      mode: 'cors',
                      body: JSON.stringify(payload)
                    }
                  });
                },

                destroy(name) {
                  return createRequest({
                    ...state,
                    url: `${state.url}/${name}`,
                    params: {
                      method: 'DELETE',
                      mode: 'cors'
                    }
                  });
                }
              }
            }
          }
        },

        // POST https://tarabaas.com/api/projects --data '{"name": "<project_name>"}'
        create(payload = {}) {
          return createRequest({
            ...state,
            params: {
              method: 'POST',
              body: JSON.stringify({name: payload.name})
            }
          });
        },

        // DELETE https://tarabaas.com/api/projects/<project_uuid>
        destroy(uuid) {
          return createRequest({
            ...state,
            url: `${state.url}/${uuid}`,
            params: {
              method: 'DELETE',
              mode: 'cors'
            }
          });
        }
      };
    }

  };

  return instance;
};
