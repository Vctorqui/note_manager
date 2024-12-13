import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  DialogProps,
  styled,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import theme from '../../../theme/theme'

interface customDialogTypes extends DialogProps {
  open: boolean
  title?: string
  fullMobile?: boolean
  children: ReactNode
  onClose?: () => void
}

const BoxClose = styled(Box)(({}) => ({
  position: 'absolute',
  right: 2,
  top: 2,
}))

const BoxDialog = styled(Dialog)(({ theme }) => ({
  '.css-43llcs-MuiPaper-root-MuiDialog-paper': {
    borderRadius: 10,
    color: theme.palette.text.secondary,
    padding: '30px',
  },
  '&.full-mobile': {
    '.MuiDialog-paper': {
      borderRadius: '0 20px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
        maxHeight: '100%',
      },
    },
    '.MuiDialogContent-root': {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2),
      },
    },
  },
}))

const CustomDialog = ({
  open,
  maxWidth = 'sm',
  fullMobile = false,
  children,
  onClose,
}: customDialogTypes) => {
  return (
    <BoxDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      className={fullMobile ? 'full-mobile' : ''}
      disableAutoFocus
    >
      <DialogTitle
        align='center'
        sx={{
          paddingY: 2,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {onClose && (
          <BoxClose>
            <IconButton
              aria-label='Close'
              sx={{ color: theme.palette.secondary.main }}
              onClick={onClose}
            >
              <Close
                width={'20px'}
                height={'20px'}
                sx={{ color: theme.palette.secondary.main }}
              />
            </IconButton>
          </BoxClose>
        )}
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>{children}</DialogContent>
    </BoxDialog>
  )
}

export default CustomDialog
