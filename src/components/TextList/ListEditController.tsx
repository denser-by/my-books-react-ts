import React from 'react';
import './TextListCompon.css';
import { Button } from 'reactstrap';

type ListEditControllerProps = {
  onListItemSelect: (event: React.MouseEvent<HTMLElement>) => void;
  onListItemsClear: (event: React.MouseEvent<HTMLElement>) => void;
  onListItemsSelectedDelete: (event: React.MouseEvent<HTMLElement>) => void;
  cssClear: string;
  cssDelete: string;
};

function ListEditController({ onListItemSelect, onListItemsClear, onListItemsSelectedDelete, cssClear, cssDelete }: ListEditControllerProps) {
  return (
    <span className='listEditBtnsColumn'>
      <Button type="button" className='listEditBtn' onClick={onListItemSelect}><strong>&lt;..&gt;</strong></Button>
      <Button type="button"
        className={cssDelete}
        onClick={onListItemsSelectedDelete}>Delete</Button>
      <Button type="button"
        className={cssClear}
        onClick={onListItemsClear}>Clear</Button>
    </span>
  );
}

export default ListEditController;