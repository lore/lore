/**
 * Default hooks
 *
 * (order still matters for now for some of these)
 *
 * TODO:
 * make order _not_ matter
 * (it pretty much doesn't, but for one core hook `redux`, it still does)
 */

module.exports = {
  connect: true,
  models: true,
  collections: true,
  reducerBlueprints: true,
  reducers: true,
  redux: true,
  dialog: true,
  actionBlueprints: true,
  actions: true
};