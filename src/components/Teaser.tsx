import React, { FC } from 'react'

interface TeaserProps {
  title: string
  date: string
  tags: string[]
  url: string
}

export const Teaser: FC<TeaserProps> = ({
  title, date, tags, url
}) => {
  return (
    <article className="teaser">
      <h2 className="teaser__title">
        <a className="teaser__title-link" href={url}>{title}</a>
      </h2>
      <div className="teaser__meta">
        <div className="teaser__date">{date}</div>
        <ul className="teaser__tags">
          {tags.map((tag, i) => (
            <li key={i} className="teaser__tag">
              <div>{tag}</div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
