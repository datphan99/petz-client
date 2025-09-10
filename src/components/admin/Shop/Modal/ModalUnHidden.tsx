import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface ModalUnHiddenProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  handleConfirmDelete: () => void;
}

export default function ModalUnHidden({
  isDialogOpen,
  handleCloseDialog,
  handleConfirmDelete,
}: ModalUnHiddenProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent className="dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="text-center">Hiển sản phẩm</ModalHeader>
            <ModalBody>
              <p>Bạn có chắc hiển thị sản phẩm.</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={handleCloseDialog}
                color="success"
                variant="light"
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                onPress={handleConfirmDelete}
                color="danger"
                className="rounded-full text-white"
              >
                Hiển thị
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
