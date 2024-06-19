'use client';

import React, {
  ChangeEventHandler, KeyboardEventHandler, memo, useEffect, useRef, useState,
} from 'react';
import dayjs from 'dayjs';

import Input from '@components/ui/Input/Input';
import Label from '@components/Label/Label';
import Todo from '@components/TodoList/Todo';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getTodos } from '@components/TodoList/selectors/getTodos';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { changeEditedTodo, TodoT } from '@components/TodoList/slice/todoListSlice';
import { createTodo } from '@components/TodoList/services/createTodo';
import { fetchTodos } from '@components/TodoList/services/fetchTodos';
import { getTodoLoading } from '@components/TodoList/selectors/getTodoLoading';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { getEditedTodo } from '@components/TodoList/selectors/getEditedTodo';
import { updateTodo } from '@components/TodoList/services/updateTodo';
import useInFocus from '@lib/hooks/useInFocus';

import cls from './style.module.scss';

export const revalidate = 0;
const TodoList = () => {
  const dispatch = useAppDispatch();
  const editedTodo = useAppSelector(getEditedTodo);
  const todos = useAppSelector(getTodos);
  const loading = useAppSelector(getTodoLoading);
  const [creatorValue, setCreatorValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && creatorValue.length) {
      if (!editedTodo) {
        const newTodo: TodoT = {
          id: `${todos.length + 1}`,
          description: creatorValue,
          completedAt: undefined,
          completed: false,
          createdAt: dayjs().format('DD-MM-YYYY HH:mm'),
        };
        dispatch(createTodo(newTodo));
      } else {
        const newTodo:TodoT = {
          ...editedTodo,
          description: creatorValue,
        };
        dispatch(updateTodo(newTodo));
        dispatch(changeEditedTodo(undefined));
      }
      setCreatorValue('');
    }
  };

  useEffect(() => {
    if (editedTodo !== undefined) {
      setCreatorValue(editedTodo.description);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [editedTodo]);

  const onBlurHandler = () => {
    if (editedTodo) {
      dispatch(changeEditedTodo(undefined));
      setCreatorValue('');
    }
  };

  return (loading
    ? <Skeleton rounded height="400px" width="100%" />
    : (
      <div className={cls.main}>
        <Label alwaysOnBorder label="Todos" />
        <Input
          ref={inputRef}
          onBlur={onBlurHandler}
          className={cls.todoCreator}
          placeholder="Type Todo description"
          onChange={(e) => setCreatorValue(e.target.value)}
          value={creatorValue}
          onKeyDown={onKeyDownHandler}
        />
        <div className={cls.List}>
          {todos.length
            ? todos.map((todo) => (
              <Todo
                key={todo.id}
                data={todo}
              />
            ))
            : <span style={{ textAlign: 'center' }}>No one todo💇‍♂️.️</span>}
        </div>
      </div>
    ));
};

export default TodoList;
