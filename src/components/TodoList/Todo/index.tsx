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
import TodoControllers from '@components/TodoList/TodoControllers';

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
  const onDeleteControllerClick = () => {
    if (editedTodo) return;
    dispatch(deleteTodo(data));
  };

  const onEditControllerClick = () => {
    if (editedTodo) return;
    dispatch(changeEditedTodo(data));
  };

  const onCompleteControllerClick = () => {
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
      <TodoControllers
        todoId={data.id}
        disableTooltipCondition={disableTooltip}
        isTodoCompleted={data.completed}
        onEditControllerClick={onEditControllerClick}
        onCompleteControllerClick={onCompleteControllerClick}
        onDeleteControllerClick={onDeleteControllerClick}
      />
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
