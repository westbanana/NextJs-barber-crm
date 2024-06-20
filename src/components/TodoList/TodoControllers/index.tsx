import React, { memo, ReactNode } from 'react';
import {
  Check, Settings2, Trash2, X, Info,
} from 'lucide-react';

import cls from '@components/TodoList/Todo/style.module.scss';
import Button from '@components/ui/Button/Button';
import Tooltip from '@components/Tooltip/Tooltip';
import { TodoT } from '@components/TodoList/slice/todoListSlice';

type TooltipChild = string | ReactNode

interface TodoControllersProps {
  todoId: string
  data?: TodoT | undefined
  isTodoCompleted: boolean
  disableTooltipCondition?: boolean
  onEditControllerClick: () => void
  onCompleteControllerClick: () => void
  onDeleteControllerClick: () => void
  deleteControllerTooltipDescription?: TooltipChild
  completeControllerTooltipDescription?: {
    completed: TooltipChild,
    notCompleted: TooltipChild
  }
  editControllerTooltipDescription?: string
}

const TodoControllers = memo(({
  todoId,
  data = undefined,
  isTodoCompleted,
  disableTooltipCondition,
  onEditControllerClick,
  onCompleteControllerClick,
  onDeleteControllerClick,
  deleteControllerTooltipDescription = 'Delete todo',
  completeControllerTooltipDescription = {
    completed: 'Incomplete todo',
    notCompleted: 'Complete todo',
  },
  editControllerTooltipDescription = 'Edit todo',
}: TodoControllersProps) => (
  <>
    <div className={cls.controllers}>
      <Button
        data-tooltip-id={`tooltip-info-${todoId}`}
        className={cls.controller}
      >
        <Info />
      </Button>
      <Button
        data-tooltip-id={`tooltip-edit-${todoId}`}
        onClick={onEditControllerClick}
        className={cls.controller}
      >
        <Settings2 />
      </Button>
      <Button
        data-tooltip-id={`tooltip-complete-${todoId}`}
        onClick={onCompleteControllerClick}
        className={cls.controller}
      >
        {!isTodoCompleted ? <Check /> : <X />}
      </Button>
      <Button
        data-tooltip-id={`tooltip-delete-${todoId}`}
        onClick={onDeleteControllerClick}
        className={cls.controller}
      >
        <Trash2 />
      </Button>
    </div>
    <Tooltip id={`tooltip-edit-${todoId}`} disabled={disableTooltipCondition}>
      {
        editControllerTooltipDescription
      }
    </Tooltip>
    <Tooltip id={`tooltip-complete-${todoId}`} disabled={disableTooltipCondition}>
      {!isTodoCompleted
        ? completeControllerTooltipDescription.completed
        : completeControllerTooltipDescription.notCompleted}
    </Tooltip>
    <Tooltip id={`tooltip-delete-${todoId}`} disabled={disableTooltipCondition}>
      {deleteControllerTooltipDescription}
    </Tooltip>
    {data !== undefined && (
      <Tooltip id={`tooltip-info-${todoId}`} disabled={disableTooltipCondition} place="bottom-start">
        <ul className={cls.infoList}>
          <li>
            {`Id: ${todoId}`}
          </li>
          <li>
            {`Створено: ${data.createdAt}`}
          </li>
          <li>
            {`Завершено: ${data.completedAt || 'не заверешено'}`}
          </li>
        </ul>
      </Tooltip>
    )}
  </>
));

export default TodoControllers;
