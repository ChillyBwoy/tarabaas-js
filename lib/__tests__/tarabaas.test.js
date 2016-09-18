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
        describe('.all()', () => {
          it('should return all project\'s databases', () => {
            expect(api
              .projects()
              .get(PROJECT_UUID)
              .databases()
              .all()
              .payload()
            ).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases`
            });
          });
        });

        describe('.get()', () => {
          it('should return info for specified database', () => {
            expect(api
              .projects()
              .get(PROJECT_UUID)
              .databases()
              .get(DATABASE_NAME)
              .payload()
            ).toEqual({
              url: `https://tarabaas.com/api/projects/${PROJECT_UUID}/databases/${DATABASE_NAME}`
            });
          });
        });

        describe('.create()', () => {
          it('should create a brand new database', () => {
            expect(api
              .projects()
              .get(PROJECT_UUID)
              .databases()
              .create(DATABASE_SCHEMA)
              .payload()
            ).toEqual({
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
            expect(api
              .projects()
              .get(PROJECT_UUID)
              .databases()
              .destroy(DATABASE_NAME)
              .payload()
            ).toEqual({
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
