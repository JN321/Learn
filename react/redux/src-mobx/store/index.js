import { action, makeObservable, observable } from "mobx";


class Store {
    constructor() {
        makeObservable(this)
    }

    // 被观察的属性
    @observable count = 0;

    @action.bound
    add_count() {
        this.count = this.count + 1;
    }

    @action.bound
    minus_count() {
        this.count = this.count - 1;
    }
}

export default new Store();