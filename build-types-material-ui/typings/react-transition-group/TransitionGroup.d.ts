export = TransitionGroup;

export as namespace TransitionGroup
//declare class TransitionGroup extends Component<TransitionGroup.TransitionGroupProps> { }



import { Component, ReactType, HTMLProps, ReactElement } from "react";
import { TransitionActions, TransitionProps } from "./Transition";

declare namespace TransitionGroup {
    interface IntrinsicTransitionGroupProps<T extends keyof JSX.IntrinsicElements = "div"> extends TransitionActions {
        component?: T;
    }

    interface ComponentTransitionGroupProps<T extends ReactType> extends TransitionActions {
        component: T;
    }

    export type TransitionGroupProps<T extends keyof JSX.IntrinsicElements = "div", V extends ReactType = any> =
        (IntrinsicTransitionGroupProps<T> & JSX.IntrinsicElements[T]) | (ComponentTransitionGroupProps<V>) & {
        children?: ReactElement<TransitionProps> | Array<ReactElement<TransitionProps>>;
        childFactory?(child: ReactElement<any>): ReactElement<any>;
      };
  class TransitionGroup extends Component<TransitionGroup.TransitionGroupProps> { }
}

/**
 * The `<TransitionGroup>` component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *
 * Consider the example below using the `Fade` CSS transition from before.
 * As items are removed or added to the TodoList the `in` prop is toggled
 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
 * component in a `<TransitionGroup>`, not just css.
 *
 * ```jsx
 * import TransitionGroup from 'react-transition-group/TransitionGroup';
 *
 * class TodoList extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = {items: ['hello', 'world', 'click', 'me']}
 *   }
 *   handleAdd() {
 *     const newItems = this.state.items.concat([
 *       prompt('Enter some text')
 *     ]);
 *     this.setState({ items: newItems });
 *   }
 *   handleRemove(i) {
 *     let newItems = this.state.items.slice();
 *     newItems.splice(i, 1);
 *     this.setState({items: newItems});
 *   }
 *   render() {
 *     return (
 *       <div>
 *         <button onClick={() => this.handleAdd()}>Add Item</button>
 *         <TransitionGroup>
 *           {this.state.items.map((item, i) => (
 *             <FadeTransition key={item}>
 *               <div>
 *                 {item}{' '}
 *                 <button onClick={() => this.handleRemove(i)}>
 *                   remove
 *                 </button>
 *               </div>
 *             </FadeTransition>
 *           ))}
 *         </TransitionGroup>
 *       </div>
 *     );
 *   }
 * }
 * ```
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual `<Transition>`
 * components. This means you can mix and match animations across different
 * list items.
 */
