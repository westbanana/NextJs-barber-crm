import React, { memo } from 'react';
import { Upload } from 'lucide-react';

import { UserIconProps } from '@/components/ui/UserIcon/user-icon.type';
import { imageUpload } from '@/helpers/imageUpload';

import cls from './style.module.scss';

export const imageMaxSizeKB = 20;

const UserIcon = memo(({
  userName = 'User Icon', withUpload = false, onChange, value,
}: UserIconProps) => {
  const [firstName, lastName] = userName.split(' ');
  const iconLetters = lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];
  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    imageUpload({ onChange, event, maxSizeKb: imageMaxSizeKB });
  };
  return (
    <div className={cls.container}>
      {withUpload && (
        <div className={cls.uploadIconContainer}>
          <input onChange={uploadImageHandler} className={cls.uploadInput} type="file" />
          <Upload className={cls.uploadIcon} />
        </div>
      )}
      {value
        ? <img className={cls.image} src={value} alt="user icon" />
        : <span>{iconLetters}</span>}
    </div>
  );
});

export default UserIcon;
