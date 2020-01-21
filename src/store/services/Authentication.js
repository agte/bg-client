import { makeAuthPlugin } from '../../feathers';

export default makeAuthPlugin({ userService: 'user' });
