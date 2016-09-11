import { init } from '../tarabaas';

describe('init()', () => {
  const api = init();

  describe('projects()', () => {

    describe('.all()', () => {
      it('should make a request and get a list of projects', () => {
        let request = api.projects().all();
        // console.log(JSON.stringify(request.payload(), '\n', 2));
      });
    });

    describe('.get()', () => {
      it('should fetch a project info', () => {
        let request = api
          .projects()
          .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179');
        // console.log(JSON.stringify(request.payload(), '\n', 2));
      });

      describe('databases', () => {
        describe('.all()', () => {
          it('should return all project\'s databases', () => {
            let request = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .all();
            // console.log(JSON.stringify(request.payload(), '\n', 2));
          });
        });

        describe('.get()', () => {
          it('should return info for specified database', () => {
            let request = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .get('tests');
            // console.log(JSON.stringify(request.payload(), '\n', 2));
          });
        });

        describe('.create()', () => {
          it('should create a brand new databse', () => {
            let request = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .create({
                name: 'test',
                schema_fields: [
                  {
                    name: 'name',
                    type: 'string'
                  }, {
                    name: 'email',
                    type: 'string'
                  }
                ]
              });
            // console.log(JSON.stringify(request.payload(), '\n', 2));
          });
        });

        describe('.destroy()', () => {
          it('should delete specified database', () => {
            let request = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .destroy('tests');
            console.log(JSON.stringify(request.payload(), '\n', 2));
          });
        });
      });
    });

    describe('.create()', () => {
      it('should create a brand new project', () => {
        let request = api.projects().create({name: `js-testing${Date.now()}`});
        // console.log(JSON.stringify(request.payload(), '\n', 2));
      });
    });

    describe('.destroy()', () => {
      it('should delete project', () => {
        let request = api.projects().destroy('7c6f7bc1-1cee-4eba-826c-50b8934c7179');
        // console.log(JSON.stringify(request.payload(), '\n', 2));
      });
    });

  });
});
