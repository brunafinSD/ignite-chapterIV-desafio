/* eslint-disable prettier/prettier */
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlImageView, setUrlImageView] = useState<string>('');

  const showModal = (url: string): void => {
    setUrlImageView(url);
    onOpen();
  }

  return (
    <SimpleGrid columns={[1,2,3]} spacing="40px">
      {cards.map(card => (
        <Card data={card} viewImage={(url) => showModal(url)} key={card.id}/>
      ))}
      <ModalViewImage imgUrl={urlImageView} isOpen={isOpen} onClose={onClose} />
    </SimpleGrid>
  );
}
