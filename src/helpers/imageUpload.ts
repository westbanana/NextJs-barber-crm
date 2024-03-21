import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { toastDefaultParams } from '@/constants/toast-constants';
import { FormObject } from '@/components/ui/UserIcon/user-icon.type';

 interface ImageUploadProps {
   event: ChangeEvent<HTMLInputElement>,
   maxSizeKb: number
   onChange: ((e: FormObject) => void) | undefined
 }

export const imageUpload = ({ event, maxSizeKb, onChange }: ImageUploadProps) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Устанавливаем размеры canvas в соответствии с размерами компонента
        canvas.width = img.width; // Ширина компонента
        canvas.height = img.height; // Высота компонента

        // Отрисовываем изображение на canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Получаем сжатую версию изображения
        const compressedImage = canvas.toDataURL('image/jpeg', 0.35); // Увеличиваем качество изображения

        const imageSizeInKB = ((compressedImage.length * 3) / 4 / 1024).toFixed(2);
        if (+imageSizeInKB > maxSizeKb) {
          toast.error('😱Зображення дуже велике! ', toastDefaultParams);
          return;
        }
        const responseResult:FormObject = {
          target: {
            id: 'userIcon',
            value: compressedImage,
          },
        };
        if (onChange) {
          onChange?.(responseResult);
        }
      };
    };

    reader.readAsDataURL(file);
  }
};
