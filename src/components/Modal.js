import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <p>This action cannot be undone. Please don't click more than once.</p>
      </DialogContent>
      <DialogActions>
        {/* Cancel Button with red styling */}
        <Button
          onClick={onClose}
          sx={{
            fontWeight: "bold",
            py: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 3 },
            borderRadius: { xs: 1, sm: 2 },
            backgroundColor: "#D32F2F", // Custom red color
            color: "white",
            '&:hover': {
              backgroundColor: "#B71C1C", // Darker red for hover effect
            }
          }}
        >
          Cancel
        </Button>
        {/* Delete Account Button with red styling */}
        <Button
          onClick={onConfirm}
          sx={{
            fontWeight: "bold",
            py: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 3 },
            borderRadius: { xs: 1, sm: 2 },
            backgroundColor: "#D32F2F", // Custom red color
            color: "white",
            '&:hover': {
              backgroundColor: "#B71C1C", // Darker red for hover effect
            }
          }}
        >
          Yes, I'm sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
