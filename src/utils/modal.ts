export const openModal = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog === null) {
    throw Error(`Dialog with id ${id} not found`);
  }

  if (dialog instanceof HTMLDialogElement) {
    dialog.showModal();
  } else {
    throw Error(`HTMLElement is not a dialog`);
  }
};

export const closeModal = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog === null) {
    throw Error(`Dialog with id ${id} not found`);
  }

  if (dialog instanceof HTMLDialogElement) {
    dialog.close();
  } else {
    throw Error(`HTMLElement is not a dialog`);
  }
};
