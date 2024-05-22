import {useCallback, useEffect, useRef, useState} from 'react';
import type {
  DataGridProps,
  GridFilterModel,
  GridSlotsComponentsProps,
  GridSortDirection,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid';
import {DataGrid} from '@mui/x-data-grid';
import type {QueryFunction, QueryKey} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import type {ServerSideQueryResult} from '../types/ServerSideQueryResult';
import DataGridToolbar from './DataGridToolbar';

export interface QueryState {
  page: number;
  pageSize: number;
  search: string;
  orderByColumn?: string;
  orderDirection: GridSortDirection;
}

const defaultQueryState: QueryState = {
  orderDirection: 'asc',
  page: 0,
  pageSize: 100,
  search: '',
};

type PaginationUpdate = Partial<Pick<QueryState, 'page' | 'pageSize'>>;

type Props<TModel extends GridValidRowModel> = Pick<
  DataGridProps<TModel>,
  'columns' | 'getRowId'
> & {
  initialQueryState?: Partial<QueryState>;
  queryFn: (state: QueryState) => QueryFunction<ServerSideQueryResult<TModel>>;
  queryKey: (state: QueryState) => QueryKey;
};

export function ServerSideDataGrid<TModel extends GridValidRowModel>({
  columns,
  getRowId,
  initialQueryState: callerInitialQueryState,
  queryFn,
  queryKey,
}: Props<TModel>) {
  const initialQueryState = {
    ...defaultQueryState,
    ...callerInitialQueryState,
  };

  const [queryState, setQueryState] = useState<QueryState>(initialQueryState);

  const {data, isLoading, isPreviousData} = useQuery(queryKey(queryState), queryFn(queryState), {
    keepPreviousData: true,
  });

  const [rowCountState, setRowCountState] = useState(0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.totalCount !== undefined ? data?.totalCount : prevRowCountState,
    );
  }, [data?.totalCount, setRowCountState]);

  const paginationUpdateRef = useRef<PaginationUpdate>({});

  // There is an open issue to make this easier in future versions of MUI Data Grid:
  // https://github.com/mui/mui-x/issues/5624
  // The root problem is that the current API treats the page and pageSize properties as
  // independent, which they are not. The updates must be done at the same time or else
  // state is lost. Solution below inspired by https://github.com/mui/mui-x/issues/3516.
  const handlePaginationUpdate = useCallback(
    async (update: PaginationUpdate) => {
      paginationUpdateRef.current = {
        ...paginationUpdateRef.current,
        ...update,
      };
      await Promise.resolve(null);
      const fullUpdate = paginationUpdateRef.current;
      if (Object.keys(fullUpdate).length > 0) {
        paginationUpdateRef.current = {};
        setQueryState((prev) => {
          const newState = {...prev, ...fullUpdate};
          const lastPageIndex = Math.max(0, Math.floor((rowCountState - 1) / newState.pageSize));
          const page = Math.min(newState.page, lastPageIndex);
          return {
            ...newState,
            page,
          };
        });
      }
    },
    [rowCountState],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      handlePaginationUpdate({page});
    },
    [handlePaginationUpdate],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      handlePaginationUpdate({pageSize});
    },
    [handlePaginationUpdate],
  );

  const handleSortModelChange = useCallback((model: GridSortModel) => {
    setQueryState((prev) => ({
      ...prev,
      orderByColumn: model[0]?.field,
      orderDirection: model[0]?.sort,
    }));
  }, []);

  const handleFilterModelChange = useCallback((model: GridFilterModel) => {
    setQueryState((prev) => ({
      ...prev,
      search: model.quickFilterValues ? model.quickFilterValues.join() : '',
    }));
  }, []);

  const componentsProps: GridSlotsComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500},
    },
  };

  const initialState = {
    pagination: {
      pageSize: initialQueryState.pageSize,
    },
    sorting: {
      sortModel: [
        {
          field: initialQueryState.orderByColumn ? initialQueryState.orderByColumn : '',
          sort: initialQueryState.orderDirection,
        },
      ],
    },
  };

  return (
    <DataGrid<TModel>
      getRowHeight={() => 'auto'}
      autoHeight
      columns={columns}
      components={{Toolbar: DataGridToolbar}}
      componentsProps={componentsProps}
      disableColumnFilter
      disableDensitySelector
      filterMode="server"
      getRowId={getRowId}
      initialState={initialState}
      loading={isLoading || isPreviousData}
      onFilterModelChange={handleFilterModelChange}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSortModelChange={handleSortModelChange}
      paginationMode="server"
      rowCount={rowCountState}
      rows={data?.data || []}
      sortingMode="server"
      sx={{
        border: 'none',
      }}
    />
  );
}

export default ServerSideDataGrid;
