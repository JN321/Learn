import PropTypes from 'prop-types';
import React, { useContext, useState,useEffect } from 'react';
import ReduxContext from './context';
export const connect = (mapStateToProps, mapDispatchToProps) => Component => 
    {
        class Connect extends React.Component {
            componentDidMount() {
                this.context.subscribe(this.handleStoreChange.bind(this))
            }
            handleStoreChange(){
                this.forceUpdate()
            }
            render () {
                return (
                    <Component
                            {...this.props}
                            {...mapStateToProps(this.context.store.getState())}
                            {...mapDispatchToProps(this.context.store.dispatch)}
                        />
                )
            }
        }
        Connect.contextTypes = {
            store: PropTypes
        }
        return Connect;
    }
    // function Connect(props) {
    //     const store = useContext(ReduxContext);
    //     const [, setCount] = useState(true);
    //     const forceUpdate = () => setCount(val => !val);
    //     useEffect(()=> store.subscribe(forceUpdate), [])
    //     return (
    //         <ReduxContext.Consumer>
    //             {
    //                 store => <Component
    //                     {...props}
    //                     {...mapStateToProps(store.getState())}
    //                     {...mapDispatchToProps(store.dispatch)}
    //                 />
    //             }
    //         </ReduxContext.Consumer>
    //     )
    // }