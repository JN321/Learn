import { action, makeObservable, observable } from 'mobx'
import { Observer } from 'mobx-react';
import React, { Component } from 'react'


export default class B extends Component {
    constructor() {
        super()
        makeObservable(this);
    }

    // @observable
    // name = "麓一";

    name = observable({value: "麓一"});

    @action
    handleClick = () => {
        this.name.value = "云隐";
        console.log(this.name)
    }

    render() {
        return (
        <div>
            <Observer>
            {() => (
                <div>
                    {this.name.value}
                    <button onClick={this.handleClick}>set</button>
                </div>
            )}
            </Observer>
        </div>
        )
    }
}
