import { environment } from '../../environments/environment';

export class Urls {
  public static readonly BASE_URL = (`${environment.protocol}://${environment.host}`);
  public static readonly APPLICATION_BASE = (`${environment.application}`);
  public static readonly APPLICATION_SUMMAY_BASE = (`${environment.get_application}`);

  public static readonly STATUS_BASE = (`${environment.stats}`);
  public static readonly LOGIN_URL = (`${environment.auth}/${environment.login}`);
  public static readonly LOGOUT_URL = (`${environment.auth}/${environment.logout}`);
  public static readonly REGISTER_URL = (`${environment.auth}/${environment.register}`);

  // users urls
  public static readonly GET_ALL_USERS = (`${environment.api_version_1}/${environment.get_all_users}`);
  public static readonly GET_USER = (`${environment.api_version_1}/${environment.get_user}`);
  public static readonly UPDATE_USER = (`${environment.api_version_1}/${environment.update_user}`);
  public static readonly DELETE_USER = (`${environment.api_version_1}/${environment.delete_user}`);
  public static readonly GET_USER_ROLES = (`${environment.api_version_1}/${environment.user_roles}`);
  public static readonly ADD_ROLE_TO_USER = (`${environment.api_version_1}/${environment.user_roles}`);
  public static readonly ADD_USER_ROLE = (`${environment.api_version_1}/${environment.add_user_role}`);

  // role urls
  public static readonly GET_ALL_ROLES = (`${environment.api_version_1}/${environment.get_all_roles}`);
  public static readonly GET_ROLE = (`${environment.api_version_1}/${environment.get_role}`);
  public static readonly UPDATE_ROLE = (`${environment.api_version_1}/${environment.update_role}`);
  public static readonly DELETE_ROLE = (`${environment.api_version_1}/${environment.delete_role}`);
  public static readonly ADD_USER_TO_ROLE = (`${environment.api_version_1}/${environment.add_user_to_role}`);
  public static readonly EDIT_ROLE_ROLE = (`${environment.api_version_1}/${environment.edit_user_to_role}`);
  public static readonly ROLES_PERMISSIONS = (`${environment.api_version_1}/${environment.roles_permission}`);

  // permission urls
  public static readonly GET_ALL_PERMISSION = (`${environment.api_version_1}/${environment.permission}`);
  public static readonly GET_ALL_PERMISSION_OF_ROLE = (`${environment.api_version_1}/${environment.permission}`);
  public static readonly GET_PERMISSION = (`${environment.api_version_1}/${environment.get_permission}`);
  public static readonly UPDATE_PERMISSION = (`${environment.api_version_1}/${environment.update_permission}`);
  public static readonly DELETE_PERMISSION = (`${environment.api_version_1}/${environment.delete_permission}`);
  public static readonly ADD_USER_TO_PERMISSION = (`${environment.api_version_1}/${environment.add_roles_to_permission}`);
  public static readonly EDIT_PERMISSION_PERMISSION = (`${environment.api_version_1}/${environment.edit_roles_to_permission}`);

  // alerts urls
  public static readonly GET_USER_ALERT = (`${environment.api_version_1}/${environment.get_user_alerts}`);
}
