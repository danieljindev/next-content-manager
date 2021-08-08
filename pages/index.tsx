import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPages } from '../slices/page';
import { getPageStates } from '../selectors';
import Loading from '../components/Loading';
import { makeExcerpt } from '../utils/helper';
import { Column } from '../types';

const columns: Column[] = [
  {
    id: 'screenshot',
    label: 'Screenshot',
    classes: 'screenshot',
    align: 'center',
    minWidth: 50,
    format: (value: string) => <img src={value || 'images/no-image.svg'} />,
  },
  {
    id: 'title',
    label: 'Title',
    minWidth: 100,
    align: 'center',
    format: (value: string) => makeExcerpt(value, 20),
  },
  {
    id: 'url',
    label: 'Page URL',
    minWidth: 50,
    align: 'center',
    format: (value: string) => (
      <Link href={`/${value}`}>
        <a>Click Here</a>
      </Link>
    ),
  },
  {
    id: 'count',
    label: 'Text Count',
    align: 'center',
    minWidth: 20,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
    format: (value: string) => makeExcerpt(value, 100),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableCell: {
    '& img': {
      height: 60,
    },
  },
});

export default function PageTable() {
  const classes = useStyles();

  // ===========================================================================
  // State
  // ===========================================================================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { loading, pages } = useSelector(getPageStates);

  // ===========================================================================
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch();
  const _fetchPages = () => dispatch(fetchPages());

  // ===========================================================================
  // Hooks
  // ===========================================================================
  useEffect(() => {
    _fetchPages();
  }, []);

  // ===========================================================================
  // Handlers
  // ===========================================================================
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <Loading loading />;
  }
  console.log(pages);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align='center' style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.title}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} className={classes.tableCell}>
                        {column.format && typeof value === 'string' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={pages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
