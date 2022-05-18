export  class Module{
  constructor(newModule) {
    this._row = newModule,
    this._children = {},
    this.state = newModule.state
  }
  getChild(key) {
    return this._children[key]
  }
  addChild(key, module) {
    this._children[key] = module
  }
}