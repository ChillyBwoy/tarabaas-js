import { init } from '../tarabaas';

describe('init()', () => {
  const api = init();

  describe('projects()', () => {
    const PROJECT_UUID = '7c6f7bc1-1cee-4eba-826c-50b8934c7179';
    const PROJECT_NAME = `newproject${Date.now()}`;
    const DATABASE_NAME = 'tests';
    const DATABASE_SCHEMA = {
      name: DATABASE_NAME,
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

      describe('databases', () => {
        const databases = api
          .projects()
          .get(PROJECT_UUID)
          .databases();

        describe('.all()', () => {
          it('should return all project\'s databases', () => {
            expect(databases.all().payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases`
            });
          });
        });

        describe('.get()', () => {
          let db = databases.get(DATABASE_NAME);

          it('should return info for specified database', () => {
            expect(db.payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}`
            });
          });

          describe('.listItems()', () => {
            it('should return all items', () => {
              expect(db.listItems().payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}`
              });
            });
          });

          describe('.createItem()', () => {
            it('should create new item', () => {
              expect(db.createItem(ITEM_PAYLOAD).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}`,
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
              expect(db.destroyItem(42).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}/42/`,
                params: {
                  method: 'DELETE',
                  mode: 'cors'
                }
              });
            });
          });

          describe('.updateItem()', () => {
            it('should update item by id with payload', () => {
              expect(db.updateItem(42, {name: 'Foo'}).payload()).toEqual({
                url: `https://tarabaas.com/api/clients/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}/42/`,
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
          it('should create a brand new database', () => {
            expect(databases.create(DATABASE_SCHEMA).payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases`,
              params: {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(DATABASE_SCHEMA)
              }
            });
          });
        });

        describe('.destroy()', () => {
          it('should delete specified database', () => {
            expect(databases.destroy(DATABASE_NAME).payload()).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}`,
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
