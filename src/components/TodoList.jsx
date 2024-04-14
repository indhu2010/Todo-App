import React from 'react';

function TodoList(props) {
  // Destructure props to extract completeTodo and deleteTodo functions
  const { completeTodo, deleteTodo } = props;

  // Check if todoArr exists in props and if it has any items, if not, load from localStorage

  let todoArr = props.todoArr.length > 0 ? props.todoArr : JSON.parse(localStorage.getItem('todos'));

  return (
    <div className='todo-list'>
      <ul>
        {todoArr && todoArr.length > 0 ? 
          // If todoArr exists and has items, map through each todo item

          todoArr.map((el, i) => (
            <li key={i}>
              <div className={el["done"] ? "line-through" : null}>{el.title}</div>
              <div className='icon'>
                {/* Icon for completing todo item */}

                <i title="Complete" onClick={() => completeTodo(i)} className={`fas fa-check-circle pointer ${el["done"] ? "green" : "blue"}`} />

                {/* Icon for deleting todo item */}
                <i title="Delete" onClick={() => deleteTodo(i)} className='fas fa-trash alt pointer' />
              </div>
            </li>
          )) 
          
          // If todoArr is empty, display nothing
          : null
        }
      </ul>
    </div>
  );
}

export default TodoList;
