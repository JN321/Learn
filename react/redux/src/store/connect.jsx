import { PropTypes } from 'prop-types';
import React from 'react';
export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    class Connect extends React.Component {
        componentDidMount() {
            this.context.store.subscribe(this.handleStoreChange.bind(this));
            // console.log('this.context', this.context);
        }
        handleStoreChange(){
            this.forceUpdate()
        }
        render () {
            return (
                <div>
                    <Component
                        {...this.props}
                        {...mapStateToProps(this.context.store.getState())}
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
                </div>
            )
        }
    }
    Connect.contextTypes = {
        store: PropTypes
    }
    return Connect;
}