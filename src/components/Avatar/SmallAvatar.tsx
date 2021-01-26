import React from 'react';
import { SmallAvatarContainer, Avatar } from './Avatar.styled';
import { getAvatarUrl } from './assetGetter';

export default function SmallAvatar({ code }: { code?: string }) {
  const silhouette = code === ''; // not a gym leader
  return (
    <SmallAvatarContainer>
      <Avatar src={getAvatarUrl(code)} silhouette={silhouette} />
    </SmallAvatarContainer>
  );
}
