# Phase 0: Planning

> **Goal:** Design rõ ràng, spec được approve, phases + tasks sẵn sàng trước khi code.
> **Output:** Design doc trong `docs/specs/` + phases + tasks
> **Status:** ⬜ Todo

---

## Definition of Done
- [ ] Có ít nhất 1 file trong `docs/specs/`
- [ ] `AGENTS.md` đã điền Stack + Folder Structure
- [ ] `tasks/todo.md` có ít nhất 1 task Phase 1
- [ ] User đã approve spec (ghi rõ trong commit message)

---

<HARD-GATE>
KHÔNG viết code, KHÔNG scaffold, KHÔNG implement cho đến khi:
1. Design spec đã viết vào docs/specs/
2. User đã approve spec
3. Phases + tasks đã tạo
</HARD-GATE>

---

## Checklist (làm theo thứ tự)

- [ ] 1. Đọc `docs/BRIEF.md` — nắm ý tưởng ban đầu
- [ ] 2. Clarify requirements (hỏi từng câu, ưu tiên multiple choice)
- [ ] 3. Propose 2-3 approaches + recommend 1 + trade-offs
- [ ] 4. User chọn approach
- [ ] 5. Present design từng section → confirm từng phần:
  - Architecture → Components → Data Flow → Error Handling → Testing
- [ ] 6. Viết design spec → `docs/specs/YYYY-MM-DD-[topic]-design.md`
- [ ] 7. Tạo ADRs cho key decisions → `docs/decisions/`
- [ ] 8. Tự review spec:
  - Placeholder còn sót? (TBD, TODO, [...])
  - Mâu thuẫn giữa sections?
  - Scope quá lớn? → chia nhỏ
  - Requirement mơ hồ? → làm rõ
- [ ] 9. Hỏi user review + approve
- [ ] 10. Chia phases PHÙ HỢP project → `docs/phases/phase-1..N.md`
- [ ] 11. Tạo tasks Phase 1 → `tasks/todo.md`
- [ ] 12. Update `AGENTS.md`:
  - Điền Stack
  - Điền Folder Structure
  - Current Phase = 1
- [ ] 13. Update `docs/ARCHITECTURE.md` — điền đầy đủ
- [ ] 14. Commit: `docs: complete Phase 0 planning`

---

## Phase Template (dùng cho Phase 1-N)

Khi tạo phases mới, dùng format này:

```markdown
# Phase [N]: [Tên Phase]

> **Goal:** [Mục tiêu cụ thể]
> **Status:** ⬜ Todo | 🔄 In Progress | ✅ Done

## Definition of Done
- [ ] [Criteria cụ thể]
- [ ] Tests pass

## Tasks
| ID | Task | Status | Commit |
|----|------|--------|--------|
| N.1 | [task] | ⬜ | - |
| N.2 | [task] | ⬜ | - |

## Dependencies
- [Phase trước phải hoàn thành]

## Notes
[Ghi chú kỹ thuật]
```

---

## Key Rules

- Hỏi **từng câu một** — không hỏi nhiều cùng lúc
- Ưu tiên **multiple choice** khi có thể
- **2-3 approaches** trước khi chốt
- Confirm **từng section** trước khi tiếp
- **KHÔNG code** cho đến khi spec approved
- Số phases **tuỳ project** — không cứng
