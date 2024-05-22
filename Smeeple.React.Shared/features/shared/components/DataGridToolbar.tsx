import type {ReactNode} from 'react';
import {GridToolbarContainer, GridToolbarQuickFilter} from '@mui/x-data-grid';
import {OFF_WHITE} from '../../../styles/theme';

type Props = {
  rightContent?: ReactNode;
};

function DataGridToolbar({rightContent}: Props) {
  return (
    <GridToolbarContainer sx={{mb: 2, p: 0}}>
      <GridToolbarQuickFilter
        sx={{
          backgroundColor: OFF_WHITE,
          borderRadius: 1,
          marginRight: 'auto',
          padding: 1,
          '& .MuiInput-underline:before': {
            borderBottom: 'none',
          },
        }}
      />
      {rightContent}
    </GridToolbarContainer>
  );
}

export default DataGridToolbar;
