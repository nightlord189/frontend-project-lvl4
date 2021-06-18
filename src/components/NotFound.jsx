import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div><h1>{t('pageNotFound')}</h1></div>
  );
};

export default NotFound;
