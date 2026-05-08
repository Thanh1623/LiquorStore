# Project: LiquorStore

> 🧠 File này là source of truth cho MỌI AI coding agent.
> Human developers: đọc `docs/ONBOARDING.md` trước.

---

## ▶ AUTO-START — Đọc section này TRƯỚC

> **🚨 MANDATORY NAVIGATION RULE:**
> 1. KHÔNG BAO GIỜ được tự ý đoán mò file hoặc grep lùng sục lung tung.
> 2. Dùng **code-review-graph MCP tools** để navigate codebase:
>    - `get_minimal_context_tool` — Lấy đúng files cần thiết cho task hiện tại
>    - `get_impact_radius_tool` — Khi sửa file, biết files nào bị ảnh hưởng
>    - `get_architecture_overview_tool` — Hiểu kiến trúc tổng quan
>    - `semantic_search_nodes_tool` — Tìm function/class theo tên
> 3. Nếu MCP tools không khả dụng (chưa cài code-review-graph):
>    → Đọc `docs/ARCHITECTURE.md` + Folder Structure trong file này
>    → Dùng file tree để navigate
>    → Gợi ý user cài: `pip install code-review-graph && code-review-graph build`

### Session Resume (BẮT BUỘC mỗi session mới)
Khi bắt đầu session mới hoặc đổi AI tool, PHẢI đọc theo thứ tự:
1. `AGENTS.md` → Current Phase + Stack + Folder Structure
2. `tasks/todo.md` → Task nào đang/cần làm
3. `tasks/done.md` → Task nào đã xong (tránh làm lại)
4. `docs/knowledge/INDEX.md` → Lessons learned
5. `git log -5 --oneline` → 5 commits gần nhất (biết đang ở đâu)

Khi user nói bất kỳ thứ gì ("bắt đầu", "start", "tiếp tục", hoặc bất kỳ prompt nào),
hãy tự detect trạng thái project và hành động:

### State Detection:

1. Kiểm tra `docs/specs/` — có file nào (ngoài .gitkeep) không?
   - **KHÔNG** → Project chưa plan → **Chạy Phase 0** (xem `docs/phases/phase-0.md`)
   - **CÓ** → Tiếp bước 2

2. Kiểm tra `tasks/todo.md` — có task "In Progress" hoặc "🔥" không?
   - **CÓ** → **Tiếp tục task đó**
   - **KHÔNG** → Tiếp bước 3

3. Kiểm tra tất cả tasks của phase hiện tại đã Done chưa?
   - **CÓ** → **Chạy Phase Transition:**
     a. Move completed tasks → `tasks/done.md`
     b. Update phase status → ✅ Done
     c. Đọc phase file tiếp theo (`docs/phases/phase-N+1.md`)
     d. Tạo tasks mới → `tasks/todo.md`
     e. Update "Current Phase" trong file này
   - **KHÔNG** → Pick task tiếp theo trong phase

4. Đọc `docs/knowledge/INDEX.md` trước khi code — tránh lỗi cũ.

### Phase 0 Auto-Flow:
Nếu project chưa plan, TỰ ĐỘNG bắt đầu:
1. Đọc `docs/BRIEF.md`
2. Hỏi clarify từng câu (ưu tiên multiple choice)
3. Propose 2-3 approaches + recommend
4. Viết spec → `docs/specs/YYYY-MM-DD-design.md`
5. Tạo ADRs → `docs/decisions/`
6. Chia phases phù hợp project → `docs/phases/phase-1..N.md`
7. Tạo tasks Phase 1 → `tasks/todo.md`
8. Update file này (Stack, Folder Structure, Current Phase)
9. Hỏi user approve

KHÔNG cần user ra lệnh cụ thể. Chỉ cần nói "bắt đầu".

<HARD-GATE>
KHÔNG viết code, KHÔNG scaffold, KHÔNG implement cho đến khi có file spec trong docs/specs/ và user đã approve.
</HARD-GATE>

---

## Project Context

Đọc theo thứ tự để hiểu project:
1. `docs/BRIEF.md` — Project overview + ý tưởng ban đầu
2. `docs/ARCHITECTURE.md` — Kiến trúc hệ thống
3. `docs/decisions/` — Tại sao chọn tech stack này
4. `docs/knowledge/INDEX.md` — Lessons learned, tránh lỗi cũ

---

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand

## Folder Structure
- `src/app/` (Next.js Pages/Components)
- `src/components/` (Shared components)
- `src/hooks/` (Hooks)
- `src/lib/` (Utils, APIs)
- `src/store/` (State)
- `src/types/` (TS Definitions)

## Phase & Task

- **Current Phase:** Phase 2 — Frontend & Mock Data Integration
- **Tasks:** xem `tasks/todo.md`
- **Phase details:** xem `docs/phases/phase-1.md`

---

## Memory & Knowledge

### Memory (riêng tư — gitignored)
Sau mỗi session, ghi notes vào `memory/YYYY-MM-DD.md`:
- Tasks completed + AI tool used
- Issues encountered
- Key files changed
- Next steps

### Knowledge (shared — committed)
Khi phát hiện bug/pattern đáng nhớ:
1. Tạo `docs/knowledge/YYYY-MM-DD-[topic].md` (dùng `docs/knowledge/TEMPLATE.md`)
2. Update `docs/knowledge/INDEX.md`
3. Nếu pattern cực quan trọng → thêm vào mục "Learned Rules" ở trên

### Decisions (shared — committed)
Khi có architecture/tech decision quan trọng:
- Tạo `docs/decisions/NNN-[topic].md` (dùng `docs/decisions/TEMPLATE.md`)

---

## Codebase Navigation

### Primary: Code-Review-Graph (MCP — tự động)
```bash
# Cài đặt (1 lần)
pip install code-review-graph && code-review-graph install

# Build lần đầu
code-review-graph build

# Update (tự động qua git hook, hoặc thủ công)
code-review-graph update
```
Sau khi build, AI tự động dùng MCP tools để navigate — không cần đọc file thủ công.
