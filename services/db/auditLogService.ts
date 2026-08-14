import { AuditLogRow, Json } from '@/types/database';

export class AuditLogService {
  private static logs: AuditLogRow[] = [];

  static async logAction(userId: string, action: string, entityType: string, entityId: string, metadata?: Json): Promise<AuditLogRow> {
    const newLog: AuditLogRow = {
      id: `audit-${Date.now()}`,
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata ?? null,
      created_at: new Date().toISOString(),
    };
    this.logs.push(newLog);
    return newLog;
  }

  static async getLogsForUser(userId: string): Promise<AuditLogRow[]> {
    return this.logs.filter(l => l.user_id === userId);
  }
}
