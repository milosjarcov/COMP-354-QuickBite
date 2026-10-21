# Definition of Done — QuickBite

A Product Backlog Item is "Done" only when ALL of the following are true:

## Code
- [ ] Code is on a feature branch and merged into `main` through a pull request
- [ ] Pull request was reviewed and approved by at least one other team member
- [ ] No console errors when using the feature

## Testing
- [ ] All acceptance criteria were tested manually and passed
- [ ] Feature works with the rest of the app on `main` after merging (integration check)
- [ ] Tested in at least one browser besides the developer's own (e.g., Chrome + Firefox)

## Database & Security
- [ ] Any new tables have RLS enabled with the policies needed
- [ ] SQL changes are saved in the `database/` folder of the repo
- [ ] No secret keys (e.g., service_role) are in the code

## Project Tracking
- [ ] Issue is linked to its pull request and moved to "Done" on the board
- [ ] Any known limitations or follow-up work are added as new backlog items
