# Issue tracker: GitHub

Issues and PRDs for this project live in the dedicated GitHub repository `Leewwp/jewel-ar-tryon`. Use the `gh` CLI for all operations.

The local `origin` remote points to this repository. Pass `--repo Leewwp/jewel-ar-tryon` explicitly when operating outside this checkout. Do not create or manage issues in `COMP5241-2526Sem1/groupproject-team_9` or `Leewwp/backup`.

## Conventions

- **Create an issue**: `gh issue create --repo Leewwp/jewel-ar-tryon --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --repo Leewwp/jewel-ar-tryon --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --repo Leewwp/jewel-ar-tryon --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo Leewwp/jewel-ar-tryon --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --repo Leewwp/jewel-ar-tryon --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo Leewwp/jewel-ar-tryon --comment "..."`

Inside this checkout, `gh` can infer the repository from the `origin` remote.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --repo Leewwp/jewel-ar-tryon --comments` and `gh pr diff <number> --repo Leewwp/jewel-ar-tryon`.
- **List external PRs for triage**: `gh pr list --repo Leewwp/jewel-ar-tryon --state open --json number,title,body,labels,author,authorAssociation,comments`, then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE`.
- **Comment / label / close**: use `gh pr comment`, `gh pr edit`, and `gh pr close` with `--repo Leewwp/jewel-ar-tryon`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either. Resolve it with `gh pr view 42 --repo Leewwp/jewel-ar-tryon` and fall back to `gh issue view 42 --repo Leewwp/jewel-ar-tryon`.

## When a skill says "publish to the issue tracker"

Create an issue in `Leewwp/jewel-ar-tryon`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo Leewwp/jewel-ar-tryon --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue. Where sub-issues are unavailable, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels are `wayfinder:<type>` (`research`, `prototype`, `grilling`, or `task`).
- **Blocking**: use GitHub's native issue dependencies. Where dependencies are unavailable, use a `Blocked by: #<n>, #<n>` line at the top of the child body.
- **Frontier query**: list the map's open children, then exclude assigned tickets and tickets with open blockers. The first remaining ticket in map order wins.
- **Claim**: `gh issue edit <n> --repo Leewwp/jewel-ar-tryon --add-assignee @me`.
- **Resolve**: comment with the answer, close the issue, then append a context pointer to the map's Decisions-so-far.
