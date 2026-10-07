# Deployment — existing Render service

Preserve the existing single Docker Web Service, tracking `main`, using Node 22. The same process serves static files and the server-authoritative room API. Keep exactly one instance, `/health`, no database or disk, and platform `PORT` binding on `0.0.0.0`. The existing `render.yaml` and Dockerfile are unchanged.

After passing CI, merge the release branch into main and let the existing auto-deploy run. Confirm `/health` reports `rulesVersion` and `visualVersion` 0.2.0 and `commit` equals the merged Git SHA (`RENDER_GIT_COMMIT`). Then run two-browser create/join, a new-champion first-to-three match and mutual rematch against the HTTPS URL.

```sh
npm install --no-save playwright
npx playwright install chromium
BASE_URL=https://YOUR-EXISTING-SERVICE.onrender.com npm run test:browser
```

CI also accepts an optional `target_url` workflow-dispatch input. The browser harness creates temporary live rooms; it does not persist data. Deploying restarts the process and loses active matches. Do not add another service, SQL, accounts or durable storage for this release.

Current deployment evidence is tracked in SUBMISSION_RELEASE_REVIEW.md. The Render connector requires explicit confirmation of the workspace before it can inspect the existing service.
