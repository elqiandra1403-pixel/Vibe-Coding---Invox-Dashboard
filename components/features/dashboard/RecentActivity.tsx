import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { CheckCircle2, Send, AlertCircle, FileEdit, ArrowRight } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';

const ICONS = {
  CheckCircle2,
  Send,
  AlertCircle,
  FileEdit
};

export function RecentActivity() {
  const router = useRouter();
  const activities = useDashboardStore(state => state.activities);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>LIVE FEED</h3>
      <h2 className={styles.cardValue} style={{fontSize: '20px'}}>Recent activity</h2>
      
      <div className={compStyles.activityList}>
        {activities.map((activity) => {
          const Icon = ICONS[activity.iconName] || CheckCircle2;
          return (
            <div key={activity.id} className={compStyles.activityItem}>
              <div className={compStyles.activityIcon} style={{backgroundColor: activity.iconBg, color: activity.iconColor}}>
                <Icon size={14} />
              </div>
              <div className={compStyles.activityContent}>
                <div className={compStyles.activityText}>
                  {activity.textParts.map((part, i) => (
                    part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>
                  ))}
                </div>
                <div className={compStyles.activityTime}>{activity.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button className={compStyles.viewAll} onClick={() => router.push('/notifications')}>
        View all activity <ArrowRight size={14} />
      </button>
    </div>
  );
}
