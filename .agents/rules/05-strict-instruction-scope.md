---
name: strict-instruction-scope
activation: always-on
---

# Rule: Strict Instruction Scope

1. **Do Not Act Without Explicit Instruction**:
   - Only execute what the user has specifically asked for.
   - Never autonomously begin implementing unrequested features, modifying files, or expanding scope beyond the user's explicit directive.

2. **Mandatory Approval for Any Additional Actions**:
   - If the agent wants or suggests doing anything beyond the user's explicit instructions, it **must ask the user first** and obtain explicit approval before taking any action.
   - If the user rejects or does not approve the suggestion, the agent must **not** proceed with it.
