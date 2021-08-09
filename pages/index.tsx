import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addPage, deletePage, fetchPages, updatePage } from '../slices/page';
import { getPageStates } from '../selectors';
import Loading from '../components/Loading';
import { makeExcerpt } from '../utils/helper';
import { Column, PageItem } from '../types';
import { Button, Card, IconButton, Modal, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { ModalStatus } from '../utils/enums';
import { v4 as uuidv4 } from 'uuid';

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
    minWidth: 100,
    align: 'center',
    format: (value: string) => (
      <Link href={`/page/${value}`}>
        <a>Click Here</a>
      </Link>
    ),
  },
  {
    id: 'count',
    label: 'Text Count',
    align: 'center',
    minWidth: 120,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
    format: (value: string) => makeExcerpt(value, 100),
  },
];

const useStyles = makeStyles((theme: Theme) => ({
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
  actionButtons: {
    display: 'flex',
  },
  AddButton: {
    textAlign: 'right',
    marginBottom: '30px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    width: '300px',
  },
  textKey: {
    width: '100%',
  },
  textValue: {
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
  },
  modalConfirm: {
    textAlign: 'right',
  },
  cardActions: {
    justifyContent: 'flex-end',
    marginRight: '20px',
  },
}));

const initialPageItem: PageItem = {
  id: '',
  url: '',
  title: '',
  author: 'Daniel Jin',
  keywords: 'React, Next, Json',
  description: '',
  screenshot: '',
  count: 0,
};

export default function PageTable() {
  const classes = useStyles();

  // ===========================================================================
  // State
  // ===========================================================================
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(ModalStatus.ADD);
  const [selectedPage, setSelectedPage] = useState<PageItem>({ ...initialPageItem });
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { loading, pages } = useSelector(getPageStates);

  // ===========================================================================
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch();
  const _fetchPages = () => dispatch(fetchPages());
  /** TODO: We need to pass unified slug instead of uuid */
  const _addPage = (uuid: string) => dispatch(addPage({ ...selectedPage, id: uuid, url: uuid }));
  const _updatePage = () => dispatch(updatePage(selectedPage));
  const _deletePage = () => dispatch(deletePage(selectedPage));

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
  // ===========================================================================
  // Handlers
  // ===========================================================================
  const handleOpen = (status: ModalStatus, page: PageItem = { ...initialPageItem }) => {
    setModalTitle(status);
    if (page) {
      setSelectedPage(page);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    /** TODO: Modal validation for page title & description */
    if (selectedPage.title && selectedPage.description) {
      switch (modalTitle) {
        case ModalStatus.ADD:
          _addPage(uuidv4());
          break;

        case ModalStatus.EDIT:
          _updatePage();
          break;

        case ModalStatus.DELETE:
          _deletePage();
          break;

        default:
          break;
      }
      setOpen(false);
    }
  };
  if (loading) {
    return <Loading loading />;
  }

  return (
    <>
      <div className={classes.AddButton}>
        <Button variant='contained' color='primary' onClick={() => handleOpen(ModalStatus.ADD)}>
          New Page
        </Button>
      </div>
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
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.tableCell}
                        >
                          {column.format && typeof value === 'string'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <div className={classes.actionButtons}>
                        <IconButton
                          aria-label='Edit Text'
                          onClick={() => handleOpen(ModalStatus.EDIT, row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='Delete Text'
                          onClick={() => handleOpen(ModalStatus.DELETE, row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
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
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Card className={classes.paper}>
          <h2>{modalTitle}</h2>
          {modalTitle != ModalStatus.DELETE ? (
            <>
              <TextField
                label='Page Title'
                className={classes.textKey}
                value={selectedPage.title}
                onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
              />
              <TextField
                label='Page Description'
                className={classes.textValue}
                multiline
                rows={4}
                value={selectedPage.description}
                onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
              />
            </>
          ) : (
            <Typography variant='subtitle1' align='left'>
              Do you really want to delete this page?
            </Typography>
          )}

          <div className={classes.modalConfirm}>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Confirm
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
}
