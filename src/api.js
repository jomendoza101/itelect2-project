export const fetchSampleUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const users = await response.json();
    return users.map(({ id, name, email }) => ({ id, name, email }));
    
  } catch (error) {
    console.error('Error fetching sample users:', error);
    return [];
    
  } finally {
    console.log('fetchSampleUsers operation completed.');
  }
};

export const fetchSampleUsersPromise = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      return users.map(({ id, name, email }) => ({ id, name, email }));
    })
    .catch((error) => {
      console.error('Error fetching sample users (Promise):', error);
      return [];
    });
};