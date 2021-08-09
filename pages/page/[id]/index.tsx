import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getPageStates } from '../../../selectors';
import { addText, deleteText, fetchPageTexts, setPage, updateText } from '../../../slices/page';
import Loading from '../../../components/Loading';
import Meta from '../../../components/Meta';
import { useState } from 'react';
import { ModalStatus } from '../../../utils/enums';
import { v4 as uuidv4 } from 'uuid';
import { TextItem } from '../../../types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: '10px',
    position: 'relative',
  },
  AddButton: {
    textAlign: 'right',
    marginBottom: '30px',
  },
  title: {
    marginTop: '20px',
  },
  author: {
    marginTop: '20px',
    marginRight: '20px',
  },
  description: {
    marginTop: '50px',
    marginBottom: '30px',
  },
  textCard: {
    marginBottom: '20px',
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

const initialTextItem: TextItem = {
  id: '',
  key: '',
  pageId: '',
  value: '',
};

const Page = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { query } = useRouter();
  const id = query.id as string;

  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Text');
  const [text, setText] = useState<TextItem>({ ...initialTextItem, pageId: id });
  // ===========================================================================
  // Selectors
  // ===========================================================================
  const { loading, texts, page } = useSelector(getPageStates);

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch();

  const _setPage = () => dispatch(setPage(id));
  const _fetchPageTexts = () => dispatch(fetchPageTexts(id));
  const _addText = () => dispatch(addText({ ...text, id: uuidv4() }));
  const _updateText = () => dispatch(updateText(text));
  const _deleteText = () => dispatch(deleteText(text));

  // ===========================================================================
  // Hooks
  // ===========================================================================
  useEffect(() => {
    _setPage();
    _fetchPageTexts();
  }, [query]);

  // ===========================================================================
  // Handlers
  // ===========================================================================
  const handleOpen = (status: ModalStatus, text: TextItem = { ...initialTextItem, pageId: id }) => {
    setModalTitle(status);
    if (text) {
      setText(text);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    /** TODO: Modal validation for text key & value */
    if (text.key && text.value) {
      switch (modalTitle) {
        case ModalStatus.ADD:
          _addText();
          break;

        case ModalStatus.EDIT:
          _updateText();
          break;

        case ModalStatus.DELETE:
          _deleteText();
          break;

        default:
          break;
      }
      setOpen(false);
    }
  };

  if (loading || !page) {
    return <Loading loading />;
  }

  return (
    <>
      <Meta
        title={page.title}
        author={page.author}
        description={page.description}
        keywords={page.keywords}
      />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h1' align='center' className={classes.title}>
            {t(page.title)}
          </Typography>
          <Typography variant='subtitle1' align='right' className={classes.author}>
            {t('Author')} : {page.author}
          </Typography>
          <Typography variant='subtitle1' align='left' className={classes.description}>
            {t(page.description)}
          </Typography>
          <div className={classes.AddButton}>
            <Button variant='contained' color='primary' onClick={() => handleOpen(ModalStatus.ADD)}>
              {t('New Text')}
            </Button>
          </div>
          {texts &&
            texts.map((text: TextItem, index) => (
              <Card key={index} className={classes.textCard}>
                <CardContent>
                  <Typography variant='h3' align='left' className={classes.title}>
                    {text.key}
                  </Typography>
                  <Typography variant='subtitle1' align='left' className={classes.author}>
                    {t(text.value)}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                  <IconButton
                    aria-label='Edit Text'
                    onClick={() => handleOpen(ModalStatus.EDIT, text)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='Delete Text'
                    onClick={() => handleOpen(ModalStatus.DELETE, text)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </CardContent>
      </Card>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Card className={classes.paper}>
          <h2>{modalTitle}</h2>
          {modalTitle != ModalStatus.DELETE ? (
            <>
              <TextField
                label='Text Key'
                className={classes.textKey}
                value={text.key}
                onChange={(e) => setText({ ...text, key: e.target.value })}
              />
              <TextField
                label='Text Value'
                className={classes.textValue}
                multiline
                rows={4}
                value={text.value}
                onChange={(e) => setText({ ...text, value: e.target.value })}
              />
            </>
          ) : (
            <Typography variant='subtitle1' align='left' className={classes.author}>
              {t('Do you really want to delete this text?')}
            </Typography>
          )}

          <div className={classes.modalConfirm}>
            <Button variant='contained' color='primary' onClick={handleSave}>
              {t('Confirm')}
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default Page;
