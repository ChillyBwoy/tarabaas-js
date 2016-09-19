function sortBy (name) {
  return {
    sort_by: name
  };
}

function offset () {}

function and (..predicates) {
  return {
    or: predicates
  }
}

function or (...predicates) {
  return {
    or: predicates
  }
}

function eq (name, value) {
  return {
    eq: {
      [name]: value
    }
  }
}

function neq (name , value) {
  return {
    neq: {
      [name]: value
    }
  }
}

function query () {

}

// '{"or": [{"eq": {"name": "Test"}}, {"eq": {"email": "test@example.com"}}]}'
// or(eq('name', 'Test'), eq('email', 'test@example.com'));

// '{"and": [{"eq": {"name": "Test"}}, {"neq": {"email": "test@example.com"}}]}'
// and(eq('name', 'Test'), neq('email', 'test@example.com'));

// '{"and": [{"eq": {"name": "Test"}}, {"neq": {"email": "test@example.com"}}], "sort_by": "name"}'
// query(and(eq('name', 'Test'), neq('email', 'test@example.com')), sortBy('name'))

// '{"and": [{"eq": {"name": "Test"}}, {"neq": {"email": "test@example.com"}}], "sort_by": "-name", "offset": 1, "limit": 10}'
// query(and(eq('name', 'Test'), neq('email', 'test@example.com')), sortBy('-name'), offset(1), limit(1));
