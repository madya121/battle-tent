import React from 'react';
import { Container, TypeLabel, TypeIcon, TypeText } from './Types.styled';
import { Type } from '../../types/Pokemon';
import getTypeColor from './typeColor';
import TypeIcons from './typeIcons';

interface TypesProps {
  types: [Type] | [Type, Type];
  icon?: boolean;
}

export default function Types({ types, icon }: TypesProps) {
  return (
    <Container>
      {types.map((type, index) => {
        const color = getTypeColor(type);
        return (
          <TypeLabel key={index}>
            <TypeIcon color={color} src={TypeIcons[type]} />
            <TypeText color={color} hidden={Boolean(icon)}>
              {type}
            </TypeText>
          </TypeLabel>
        );
      })}
    </Container>
  );
}
