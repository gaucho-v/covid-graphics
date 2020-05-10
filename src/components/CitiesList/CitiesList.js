import React from 'react'
import { Modal } from 'antd';

const CitiesList = ({listCitiesForRussia,onCloseCitiesList}) => {
  return (
      <Modal
        title="Список городов и областей для поиска"
        visible={!!listCitiesForRussia}
        onOk = {onCloseCitiesList}
        onCancel = {onCloseCitiesList}
      >
        {listCitiesForRussia && listCitiesForRussia.sort().map((el) => `${el} `)}
      </Modal>
  );
};

export default CitiesList

