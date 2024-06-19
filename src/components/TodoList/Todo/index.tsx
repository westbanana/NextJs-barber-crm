import React, { memo } from 'react';
import {
  Settings2, Trash2, Check, X,
} from 'lucide-react';
import dayjs from 'dayjs';

import { classNames, Mods } from '@lib/classNames/classNames';
import { changeEditedTodo, TodoT } from '@components/TodoList/slice/todoListSlice';
import Button from '@components/ui/Button/Button';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { deleteTodo } from '@components/TodoList/services/deleteTodo';
import animations from '@variables/animations/animations.module.scss';
import { updateTodo } from '@components/TodoList/services/updateTodo';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEditedTodo } from '@components/TodoList/selectors/getEditedTodo';
import Tooltip from '@components/Tooltip/Tooltip';

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

  const toggleCompleteTodoHandler = () => {
    if (editedTodo) return;
    dispatch(updateTodo({
      ...data,
      completed: !data.completed,
      completedAt: data.completed ? undefined : dayjs().format('DD-MM-YYYY HH:mm'),
    }));
  };
  const disableTooltip = editedTodo && editedTodo?.id !== data.id;
  return (
    <div className={classNames(cls.todo, mods, [animations.fadeIn])}>
      <span
        className={cls.todoDescription}
        data-tooltip-id={`todo-tooltip-${data.id}`}
      >
        {data.description}
      </span>
      <div className={cls.controllers}>
        <Button
          data-tooltip-id={`tooltip-edit-${data.id}`}
          onClick={editTodoHandler}
          className={cls.controller}
        >
          <Settings2 />
        </Button>
        <Button
          data-tooltip-id={`tooltip-complete-${data.id}`}
          onClick={toggleCompleteTodoHandler}
          className={cls.controller}
        >
          {!data.completed ? <Check /> : <X />}
        </Button>
        <Button
          data-tooltip-id={`tooltip-delete-${data.id}`}
          onClick={deleteTodoHandler}
          className={cls.controller}
        >
          <Trash2 />
        </Button>
      </div>
      <Tooltip id={`tooltip-edit-${data.id}`} disabled={disableTooltip}>Edit todo</Tooltip>
      <Tooltip id={`tooltip-complete-${data.id}`} disabled={disableTooltip}>
        {!data.completed
          ? 'Complete todo'
          : 'Uncomplete todo' }
      </Tooltip>
      <Tooltip id={`tooltip-delete-${data.id}`} disabled={disableTooltip}>Delete todo</Tooltip>
      <Tooltip id={`todo-tooltip-${data.id}`} disabled={editedTodo && editedTodo?.id !== data.id} place="bottom-start">
        <ul className={cls.infoList}>
          <li>
            {`Id: ${data.id}`}
          </li>
          <li>
            {`Створено: ${data.createdAt}`}
          </li>
          <li>
            {`Завершено: ${data.completedAt || 'не заверешено'}`}
          </li>
        </ul>
      </Tooltip>
    </div>
  );
});

export default Todo;
