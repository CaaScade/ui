import { environment } from '../../environments/environment';

export class Urls {
  public static readonly BASE_URL = (`${environment.protocol}://${environment.host}`);
  public static readonly APPLICATION_BASE = (`${environment.application}`);
  public static readonly APPLICATION_SUMMAY_BASE = (`${environment.get_application}`);

  public static readonly STATUS_BASE = (`${environment.stats}`);
  public static readonly LOGIN_URL = (`${environment.auth}/${environment.login}`);
  public static readonly LOGOUT_URL = (`${environment.auth}/${environment.logout}`);
  public static readonly REGISTER_URL = (`${environment.auth}/${environment.register}`);
}
