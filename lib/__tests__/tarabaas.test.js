import { init } from '../tarabaas';

describe('init()', () => {
  const api = init();

  describe('projects()', () => {

    describe('.all()', () => {
      it('should make a request and get a list of projects', () => {
        let p = api
          .projects()
          .all()
          .payload();
        expect(p.url).toEqual('https://tarabaas.com/api/projects');
      });
    });

    describe('.get()', () => {
      it('should fetch a project info', () => {
        let uuid = '7c6f7bc1-1cee-4eba-826c-50b8934c7179';
        let p = api
          .projects()
          .get(uuid)
          .payload();
        expect(p.url).toEqual(`https://tarabaas.com/api/projects/${uuid}`);
      });

      describe('databases', () => {
        describe('.all()', () => {
          it('should return all project\'s databases', () => {
            let uuid = '7c6f7bc1-1cee-4eba-826c-50b8934c7179';
            let p = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .all()
              .payload();
            expect(p.url).toEqual(`https://tarabaas.com/api/projects/${uuid}/databases`);
          });
        });

        describe('.get()', () => {
          it('should return info for specified database', () => {
            let p = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .get('tests')
              .payload();
            // console.log(JSON.stringify(p, '\n', 2));
          });
        });

        describe('.create()', () => {
          it('should create a brand new databse', () => {
            let p = api
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
              })
              .payload();
            // console.log(JSON.stringify(p, '\n', 2));
          });
        });

        describe('.destroy()', () => {
          it('should delete specified database', () => {
            let p = api
              .projects()
              .get('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
              .databases()
              .destroy('tests')
              .payload();
            // console.log(JSON.stringify(p, '\n', 2));
          });
        });
      });
    });

    describe('.create()', () => {
      it('should create a brand new project', () => {
        let p = api
          .projects()
          .create({
            name: `js-testing${Date.now()}`
          })
          .payload();
        // console.log(JSON.stringify(p, '\n', 2));
      });
    });

    describe('.destroy()', () => {
      it('should delete project', () => {
        let p = api
          .projects()
          .destroy('7c6f7bc1-1cee-4eba-826c-50b8934c7179')
          .payload();
        // console.log(JSON.stringify(p, '\n', 2));
      });
    });

  });
});
