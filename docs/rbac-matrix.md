# RBAC Permission Matrix

| Feature       | Admin/Owner | Staff Finance | Client          |
|---------------|-------------|---------------|-----------------|
| Dashboard     | ✅ Full     | ✅ Full       | ❌ No           |
| Invoices      | ✅ Full     | ✅ Full       | 🔒 Own only (read) |
| Customers     | ✅ Full     | ✅ Full       | 🔒 Own only (read) |
| Payments      | ✅ Full     | ✅ Full       | ❌ No           |
| Analytics     | ✅ Full     | ✅ Full       | ❌ No           |
| Reports       | ✅ Full     | ✅ Full       | ❌ No           |
| Subscription  | ✅ Full     | ❌ No         | ❌ No           |
| Settings      | ✅ Full     | ❌ No         | ❌ No           |
| Audit Log     | ✅ Read     | ❌ No         | ❌ No           |
| Notifications | ✅ Full     | ✅ Full       | 🔒 Own only     |

Enforcement: UI layer → API route → Postgres RLS (3 layers)
