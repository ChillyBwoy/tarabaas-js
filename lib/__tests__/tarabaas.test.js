import { init } from '../tarabaas';

describe('init()', () => {
  const api = init();

  describe('projects()', () => {
    const PROJECT_UUID = '7c6f7bc1-1cee-4eba-826c-50b8934c7179';
    const PROJECT_NAME = `newproject${Date.now()}`;
    const COLLECTION_NAME = 'tests';
    const COLLECTION_SCHEMA = {
      name: COLLECTION_NAME,
      schema_fields: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'email',
          type: 'string'
        }
      ]
    };
    const ITEM_PAYLOAD = {
      name: 'Test user',
      email: 'test@example.com'
    };

    describe('.all()', () => {
      it('should make a request and get a list of projects', () => {
        expect(api
          .projects()
          .all()
          .payload()
        ).toEqual({
          url: 'https://tarabaas.com/api/projects'
        });
      });
    });

    describe('.get()', () => {
      it('should fetch a project info', () => {
        expect(api
          .projects()
          .get(PROJECT_UUID)
          .payload()
        ).toEqual({
          url: `https://tarabaas.com/api/projects/${PROJECT_UUID}`
        });
      });

      describe('collections', () => {
        const collections = api
          .projects()
          .get(PROJECT_UUID)
          .collections();

        describe('.all()', () => {
          it('should return all project\'s collections', () => {
            expect(collections.all().payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/collections`
            });
          });
        });

        describe('.get()', () => {
          let coll = collections.get(COLLECTION_NAME);

          it('should return info for specified collection', () => {
            expect(coll.payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}`
            });
          });

          describe('.listItems()', () => {
            it('should return all items', () => {
              expect(coll.listItems().payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}`
              });
            });
          });

          describe('.createItem()', () => {
            it('should create new item', () => {
              expect(coll.createItem(ITEM_PAYLOAD).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}`,
                params: {
                  method: 'POST',
                  mode: 'cors',
                  body: JSON.stringify(ITEM_PAYLOAD)
                }
              });
            });
          });

          describe('.destroyItem()', () => {
            it('should destroy item by id', () => {
              expect(coll.destroyItem(42).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}/42/`,
                params: {
                  method: 'DELETE',
                  mode: 'cors'
                }
              });
            });
          });

          describe('.updateItem()', () => {
            it('should update item by id with payload', () => {
              expect(coll.updateItem(42, {name: 'Foo'}).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}/42/`,
                params: {
                  method: 'PUT',
                  mode: 'cors',
                  body: JSON.stringify({name: 'Foo'})
                }
              });
            });
          });
        });

        describe('.create()', () => {
          it('should create a brand new collection', () => {
            expect(collections.create(COLLECTION_SCHEMA).payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/collections`,
              params: {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(COLLECTION_SCHEMA)
              }
            });
          });
        });

        describe('.destroy()', () => {
          it('should delete specified collection', () => {
            expect(collections.destroy(COLLECTION_NAME).payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/collections/${COLLECTION_NAME}`,
              params: {
                method: 'DELETE',
                mode: 'cors'
              }
            });
          });
        });
      });
    });

    describe('.create()', () => {
      it('should create a brand new project', () => {
        expect(api
          .projects()
          .create({
            name: PROJECT_NAME
          })
          .payload()
        ).toEqual({
          url:'https://tarabaas.com/api/projects',
          params: {
            method: 'POST',
            mode: 'cors',
            body: `{"name":"${PROJECT_NAME}"}`
          }
        });
      });
    });

    describe('.destroy()', () => {
      it('should delete project', () => {
        expect(api
          .projects()
          .destroy(PROJECT_UUID)
          .payload()
        ).toEqual({
          url: `https://tarabaas.com/api/projects/${PROJECT_UUID}`,
          params: {
            method: 'DELETE',
            mode: 'cors'
          }
        });
      });
    });

  });
});
