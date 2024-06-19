import React, { memo } from 'react';
import { Settings2, Trash2, Check } from 'lucide-react';

import { classNames, Mods } from '@lib/classNames/classNames';
import { changeEditedTodo, TodoT } from '@components/TodoList/slice/todoListSlice';
import Button from '@components/ui/Button/Button';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteTodo } from '@components/TodoList/services/deleteTodo';
import animations from '@variables/animations/animations.module.scss';
import { updateTodo } from '@components/TodoList/services/updateTodo';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEditedTodo } from '@components/TodoList/selectors/getEditedTodo';

import cls from './style.module.scss';

interface TodoProps {
  data: TodoT,
}

const Todo = memo(({ data }: TodoProps) => {
  const dispatch = useAppDispatch();
  const editedTodo = useAppSelector(getEditedTodo);
  const mods: Mods = {
    [cls.completed]: data.completed,
    [cls.edited]: editedTodo?.id === data.id,
    [cls.notEdited]: (editedTodo?.id !== data.id) && editedTodo !== undefined,
  };
  const deleteTodoHandler = () => {
    if (editedTodo) return;
    dispatch(deleteTodo(data));
  };

  const editTodoHandler = () => {
    if (editedTodo) return;
    dispatch(changeEditedTodo(data));
  };

  const completeTodoHandler = () => {
    if (editedTodo) return;
    dispatch(updateTodo({ ...data, completed: true }));
  };

  return (
    <div className={classNames(cls.todo, mods, [animations.fadeIn])}>
      {data.description}
      <div className={cls.controllers}>
        <Button
          onClick={editTodoHandler}
          className={cls.controller}
        >
          <Settings2 />
        </Button>
        <Button
          onClick={completeTodoHandler}
          className={cls.controller}
        >
          <Check />
        </Button>
        <Button
          onClick={deleteTodoHandler}
          className={cls.controller}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
});

export default Todo;
