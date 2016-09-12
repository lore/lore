# hooks

Hooks provide most of the useful functionality in Lore, and many of them add things to the `lore` object like 
`lore.models` or `lore.store`. They are broken apart from the core in an effort to move towards the 
[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) and make it easier 
for people to override the default behaviors of the framework with their own.

#### hooks
1. **actionBlueprints** - creates default CRUD hooks for all models
2. **actions** - appends or overrides previously defined actions with project defined ones
3. **collections** - creates a collection for every model
4. **connect** - configures the `lore.connect` decorator
5. **dialog** - helper for launching dialogs
6. **models** - creates models from configs in `src/models`
7. **reducers**  - appends or overrides previously defined reducers with project defined ones & creates default CRUD reducers for all models
8. **redux** - creates the store that Redux will use
9. **router** - (forthcoming)
