import CreditUpdateService from '@backend/services/CreditUpdateService';
import cron from 'node-cron';

export function initCronJobs() {
  cron.schedule('0 * * * *', () => CreditUpdateService.updateAllUserCredits());
}
