import { environment } from '../../environments/environment';

export class Urls {
  public static readonly BASE_URL = (`${environment.protocol}://${environment.host}`);
  public static readonly APPLICATION_BASE = (`${environment.application}`);
  public static readonly APPLICATION_SUMMAY_BASE = (`${environment.get_application}`);

  public static readonly STATUS_BASE = (`${environment.stats}`);
}
