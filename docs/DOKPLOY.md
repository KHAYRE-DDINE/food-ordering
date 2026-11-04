# Dokploy beta and production

Both environments use independent services, credentials, database volumes and application settings. Application source is intentionally unconnected: connect GitHub in Dokploy, select the repository and branch, then deploy. Autodeploy is off so an unverified push does not release production.

The environment variables already provisioned in Dokploy include database connections and generated application secrets. Keep those values. Set only the blank external integration settings you need. Never put runtime secrets in GitHub source files or Docker build arguments.

Choose `/` as the GitHub Build Path. Dockerfile paths below are relative to the repository root; Docker Context Path is the service directory. Deploy database services before backend applications, and deploy frontends after their backends are healthy. Build one application at a time on this VPS.

Organization: **Personal Projects**. Project: **Food Ordering**. Environments: `beta`, `production`.

| Service | Dockerfile | Docker context | Internal port |
| --- | --- | --- | --- |
| Web application | `Dockerfile` | `.` | 3000 |
| Database | MySQL 8.0 image | — | 3306 |

Each environment has its own Dokploy-generated URL and MySQL database. `DATABASE_URL` is already populated. `OPENAI_API_KEY` is optional; leave it blank to keep the AI assistant unavailable. Adding a key can enable billable provider requests, so configure it deliberately.

The Docker image runs `prisma migrate deploy` before starting the standalone Next.js server. It never runs `db push` or demo seeds automatically. The added migration brings a fresh database up to the current schema and backfills unique tracking tokens for existing orders. Keep a database backup before applying migrations to any existing populated installation.
