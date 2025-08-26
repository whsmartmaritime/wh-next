import { useTranslations } from 'next-intl'
import * as React from 'react'
import MediaContent, { MediaContentProps } from './MediaContent'

export type MediaContentI18nProps = Omit<MediaContentProps, 'title' | 'body'> & {
  namespace?: string
  titleKey?: string
  bodyKey?: string
}

const MediaContentI18n: React.FC<MediaContentI18nProps> = ({
  namespace = 'MediaContent',
  titleKey = 'title',
  bodyKey = 'body',
  ...rest
}) => {
  const t = useTranslations(namespace)
  return <MediaContent title={t(titleKey)} body={t(bodyKey)} {...rest} />
}

export default MediaContentI18n
