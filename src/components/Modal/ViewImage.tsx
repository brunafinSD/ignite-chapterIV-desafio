import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="900px">
        <ModalBody
          bgColor="pGray.800"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={imgUrl} maxWidth="900px" maxHeight="600px" />
        </ModalBody>
        <ModalFooter bgColor="pGray.800" justifyContent="flex-start">
          <Link onClick={onClose} href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
