import {NOTIFICATION_COUNT} from '../Type';

export const NotificationsCount = count => {
  return {
    type: NOTIFICATION_COUNT,
    payload: count,
  };
};
