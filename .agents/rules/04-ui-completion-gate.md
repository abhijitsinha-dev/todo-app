---
name: ui-completion-gate
activation: always-on
---

# Rule: UI Completion Gate

- **NEVER** declare a UI task, view, or milestone complete until `ui-browser-verifier` has passed with zero blocking findings across Desktop, Tablet, and Mobile viewports.
- **NEVER** launch `ui-browser-verifier` before `vite-build-validator` exits with code `0`.
- Report both build and browser verification output tables before marking any UI task as done.
