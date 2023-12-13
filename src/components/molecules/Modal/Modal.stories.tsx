import { openModal } from "@/utils";
import { Modal, ModalProps } from "./Modal";
import type { Meta, StoryObj } from "@storybook/react";

const ModalWithTrigger = (props: ModalProps) => {
  return (
    <>
      <button onClick={() => openModal("my_modal")} className="btn">
        open modal
      </button>
      <Modal {...props} id="my_modal">
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onConfirm: {
      action: "confirm",
    },
  },
  render: (args) => <ModalWithTrigger {...args} />,
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  args: {
    title: "my modal",
  },
};
