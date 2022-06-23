import { Observer, useLocalObservable } from 'mobx-react';
import React from 'react';
import store from '../store/index';


export default function A() {
    const r_store = useLocalObservable(() => store);
  return (
    <div>
        <Observer>
            {
                () => (
                    <div>
                        <h2>{r_store.count}</h2>
                        <button onClick={() => r_store.add_count()}>+</button>
                        <button onClick={() => r_store.minus_count()}>-</button>
                    </div>
                )
            }
        </Observer>
    </div>
  )
}
