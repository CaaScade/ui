// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  protocol: 'http',
  host: 'localhost:9000',
  api_version_1: 'api/v1',
  application: 'application',
  stats: 'stats',
  auth: 'auth',
  login: 'login',
  register: 'register',
  logout: 'logout',
  get_application: 'application/{app_name}',

  // user relates endpoints
  get_all_users: 'users',
  get_user: 'user/{user_name}',
  update_user: 'user/{user_name}',
  delete_user: 'user/{user_name}',

  user_roles: 'user/{user_name}/roles',
  add_user_role: 'user/{user_name}/role',


  // roles relates endpoints
  get_all_roles: 'roles',
  new_roles: 'roles',
  get_role: 'roles/{role_name}',
  update_role: 'role/{role_name}',
  add_role: 'role/{role_name}',
  delete_role: 'role/{role_name}',

  get_role_users: 'roles/{role_name}/users',
  add_user_to_role: 'roles/{role_name}/role',
  edit_user_to_role: 'roles/{role_name}/role',

  roles_permission: 'role/{role_name}/permissions',


  // permission relates endpoints
  permission: 'permission',
  get_permission: 'permission/{permission_name}',
  update_permission: 'permission/{permission_name}',
  delete_permission: 'permission/{permission_name}',

  get_permission_roles: 'permissions/{permission_name}/roles',
  add_roles_to_permission: 'permissions/{permission_name}/roles',
  edit_roles_to_permission: 'permissions/{permission_name}/roles',

  // alert related endpoints
  get_user_alerts: 'slack/{user_name}/alert',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
