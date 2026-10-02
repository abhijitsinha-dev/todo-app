---
name: ui-completion-gate
activation: always-on
---

# Rule: UI Completion Gate

- **NEVER** declare a UI task, view, or milestone complete until `ui-browser-verifier` passes with zero blocking findings across Desktop, Tablet, and Mobile.
- Report the browser verification output table before marking any UI task done.
- Pre-flight `npm run build` is deferred to the Commit Gate — not required per UI task.
