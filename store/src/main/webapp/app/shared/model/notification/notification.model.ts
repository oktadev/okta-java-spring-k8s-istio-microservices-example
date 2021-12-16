import dayjs from 'dayjs';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  date?: string;
  details?: string | null;
  sentDate?: string;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export const defaultValue: Readonly<INotification> = {};
