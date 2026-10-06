# NewGas implementation status

## Database safety

The connected Neon project was inspected before any changes:
- Project: `delicate-scene-41642246` (`neon-teal-garden`).
- Only available branch: `main` (`br-odd-field-auq8hhp7`, default and active).
- Existing tables include business, customer, product, sales, receipt, debt, and authentication tables.
- No SQL was executed. No schema or existing business data was modified.
- No production promotion was attempted.

An isolated development branch must be created/connected and verified before adding NewGas business tables. Available tools in this implementation did not expose branch creation. Do not overwrite or reinterpret existing tables without inspecting their schema and ownership.

## What runs now

The public root is an explicitly labelled, session-only demo. It has shared in-memory state, seeded by `src/lib/demo-data.ts`. Refresh resets all changes. Never enter real sensitive data.

- Owner overview: calculated sample metrics, reporting-period selection, sales chart, task actions, recent sales, inventory alerts.
- Owner management: demo worker records with salary/commission configuration, task assignment, transaction filters, stock/price updates, order progression and assignment, client order summaries, CSV reports, printable payslip estimates.
- Worker preview: Alex Morgan's tasks, sales, calculated sample earnings, and withdrawal requests.
- Client preview: Greenfield Foods' product browsing, pay-on-delivery orders, and timestamped tracking.
- Shared workflows: a logged sale decrements stock; an order reserves stock; owner order updates appear in client tracking; worker requests appear in owner withdrawal management.
- Withdrawals can be approved or declined. Approval never marks a transfer paid or moves money.
- Demo role switching is intentionally public and is not an authorization mechanism.

## Authentication and authorization boundary

Neon Auth modules and a custom branded sign-in page are implemented. They require `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` in the server environment. Credentials are never embedded in browser code.

The auth proxy only allows existing-account email sign-in, sign-out, and session retrieval. Signup, administrative account creation, and other proxy operations remain blocked.

`/portal` calls Neon Auth server-side and redirects unauthenticated requests to sign-in. An authenticated account receives only a pending-provisioning screen. Authentication alone does not confer a business role. No live business data API exists, so no business records are exposed through this app.

Owner/worker/client role records and their server-side ownership checks are **not implemented yet**; they are blocked on the isolated branch. No claim is made that Postgres RLS or live multi-role separation is configured. The sample UI filters are not a security boundary.

Live authentication must be tested with a configured Neon identity. Type/build validation is not an end-to-end auth test.

## Nine-stage rollout status

No stage is complete as a production-backed feature:
1. Neon sign-in foundation and fail-closed landing are present. Signup, email verification UI, role provisioning and separate protected role routes remain pending.
2. Worker management/task assignment: interactive demo only; persistent accounts and data pending.
3. Worker tasks and logging: interactive demo only; server validation pending.
4. Monitoring: filtered sample transactions; real-time business refresh pending.
5. Inventory: connected sample quantities and thresholds; database concurrency and ledger pending.
6. Client products/orders: demo only; client registration and profile/address persistence pending.
7. Order management/tracking: connected demo stages; server ownership and persistent history pending.
8. Payroll: illustrative fixed base plus commission, CSV and browser-print payslip; persisted payroll periods, accounting, deductions, payment history and actual salary rules pending.
9. Withdrawal approval: demo only; no payout integration, identity verification, external account collection or settlement.

Cloudinary is approved but no uploads or private-document retrieval is enabled. PDF downloads use the browser print/save-to-PDF flow for demo payslips; generated sales/performance PDF reports are not implemented.

## Business confirmations needed

- Operating country and currency.
- Development Neon branch connection (verify before schema changes).
- Verified initial owner identity and controlled owner provisioning process.
- Commission basis, payroll period, proration, deductions and earning eligibility.
- Payout provider before real money operations.
- Cloudinary configuration and private-document access requirements before uploads.

## Manual demo checks

1. Add a demo team member; assign a task to Alex; switch to worker and advance the task. Return to owner and inspect the update.
2. Log a sale as Alex. Verify it appears in owner transactions and inventory is reduced by its quantity.
3. Try negative/over-stock quantities and fractional cylinders; verify rejection.
4. Switch to client; place an order; switch to owner and move its status forward. Return to client to inspect the timeline.
5. Request a withdrawal as Alex; approve as owner. Verify the state says awaiting payout integration, not paid, and reserved requests reduce available sample earnings.
6. Filter/export sales; download payroll and worker performance CSV files; print an illustrative payslip.
7. Refresh and verify demo resets, as advertised.
8. Visit `/portal` while signed out; verify sign-in redirection. With configured auth, sign in and verify no live business data or role-selection privilege is granted.

Before launch, replace sample workflows with authenticated server operations, validate concurrent stock and withdrawal requests transactionally, enforce immutable accounting/audit history, and test cross-role and cross-account access denial.
