import React, { ChangeEvent, memo, useState } from 'react';
import { Upload } from 'lucide-react';

import { UserIconProps } from '@/components/ui/UserIcon/user-icon.type';

import cls from './style.module.scss';

const UserIcon = memo(({
  userName = 'User Icon', withUpload = false, onChange, value,
}:UserIconProps) => {
  const [firstName, lastName] = userName.split(' ');
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        onChange?.({ target: { id: 'userIcon', value: reader.result as string } });
      };

      reader.readAsDataURL(file);
    }
  };

  const iconLetters = lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];

  return (
    <div className={cls.container}>
      {withUpload && (
        <div className={cls.uploadIconContainer}>
          <input onChange={handleImageUpload} className={cls.uploadInput} type="file" />
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
