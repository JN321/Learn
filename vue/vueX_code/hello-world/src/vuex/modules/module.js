import {
  forEach
} from "../util"

export class Module {
  constructor(newModule) {
    this._row = newModule
    this._children = {}
    this.state = newModule.state
  }
  get namespaced() {
    return this._row?.namespace
  }
  getChild(key) {
    return this._children[key]
  }
  addChild(key, module) {
    this._children[key] = module
  }
  foreachMutations(fn) {
    forEach(this._row.mutations, fn)
  }
  foreachActions(fn) {
    forEach(this._row.actions, fn)
  }
  foreachGetters(fn) {
    forEach(this._row.getters, fn)
  }
  foreachChild(fn) {
    forEach(this._children, fn)
  }
}