import React from 'react';
import { SmallAvatarContainer, Avatar } from './Avatar.styled';
import { getAvatarUrl } from './assetGetter';

export default function SmallAvatar({ code }: { code?: string }) {
  return (
    <SmallAvatarContainer>
      <Avatar src={getAvatarUrl(code)} silhouette />
    </SmallAvatarContainer>
  );
}
