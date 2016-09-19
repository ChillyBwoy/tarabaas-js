import { createRequest } from './request';
import { DEFAULT_OPTIONS } from './settings';

let instance = null;

export function init (settings = DEFAULT_OPTIONS) {
  const URL_BASE = `${settings.serverURL}/api`;
  const URL_PROJECTS = `${URL_BASE}/projects`;

  if (!!instance) {
    return instance;
  }

  const projectsAll = () => createRequest({url: URL_PROJECTS});

  const projectsCreate = (payload = {}) => createRequest({
    url: URL_PROJECTS,
    params: {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({name: payload.name})
    }
  });

  const projectsDestroy = (uuid) => createRequest({
    url: `${URL_PROJECTS}/${uuid}`,
    params: {
      method: 'DELETE',
      mode: 'cors'
    }
  });

  const projectsGet = (uuid) => {
    let databasesURL = `${URL_PROJECTS}/${uuid}/databases`;

    const databasesAll = () => createRequest({url: databasesURL});

    const databasesCreate = (payload = {}) => createRequest({
      url: databasesURL,
      params: {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload)
      }
    });

    const databasesDestroy = (name) => createRequest({
      url: `${databasesURL}/${name}`,
      params: {
        method: 'DELETE',
        mode: 'cors'
      }
    });

    return {
      ...createRequest({url: `${URL_PROJECTS}/${uuid}`}),
      databases() {
        let itemsURL = `${URL_BASE}/clients/projects/${uuid}/databases`;

        return {
          all: databasesAll,
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
              }),
              search: (payload) => createRequest({
                url: `${itemsURL}/${name}/search`,
                params: {
                  method: 'POST',
                  mode: 'cors',
                  body: JSON.stringify(payload)
                }
              })
            }
          },
          create: databasesCreate,
          destroy: databasesDestroy
        }
      }
    }
  };

  instance = {
    projects() {
      return {
        all: projectsAll,
        create: projectsCreate,
        destroy: projectsDestroy,
        get: projectsGet
      };
    }
  };

  return instance;
};
