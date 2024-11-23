//TODO: Seems a little too much, it comes from another project ?

import React, { FC } from 'react'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { TagList, TagListItem } from '../sections/TagList'
import { Testimonial } from '../elements/Testimonial'
import { StatList, StatListItem } from './StatList'
import TopTip from './TopTip' // Import the TopTip component
import rehypeHighlight from 'rehype-highlight'

interface MessageMarkdownProps {
  content: string
}

interface TagListItem {
  tagName: string
}

interface Blockquote {
  author: {
    name: string
    role: string
  }
  image: {
    src: string
  }
  text: string
}

interface StatListItem {
  value: string
  label: string
}

interface ExtractedData {
  tags: TagListItem[]
  blockquote: Blockquote
  stats: StatListItem[]
  otherText: string
  topTipContent: string
}

function extractDataFromMDX(mdxString: string): ExtractedData {
  const tags: TagListItem[] = []
  const stats: StatListItem[] = []
  let topTipContent = ''

  let tagListMatch
  try {
    if (typeof mdxString === 'undefined') {
      throw new Error('mdxString is undefined')
    }
    tagListMatch = mdxString.match(/<TagList>[\s\S]*?<\/TagList>/)
  } catch (error) {
    console.log('error')
  }
  if (tagListMatch) {
    const tagListItems = tagListMatch[0].match(
      /<TagListItem>(.*?)<\/TagListItem>/g,
    )
    if (tagListItems) {
      tagListItems.forEach((tag) => {
        const tagNameMatch = tag.match(/<TagListItem>(.*?)<\/TagListItem>/)
        if (tagNameMatch) {
          tags.push({ tagName: tagNameMatch[1] })
        }
      })
    }
  }

  const blockquoteMatch = mdxString.match(
    /<Blockquote[\s\S]*?>([\s\S]*?)<\/Blockquote>/,
  )
  let blockquote = {
    author: {
      name: '',
      role: '',
    },
    image: { src: '' },
    text: '',
  }

  if (blockquoteMatch) {
    const authorNameMatch = blockquoteMatch[0].match(/name: '([^']*)'/)
    const authorRoleMatch = blockquoteMatch[0].match(/role: '([^']*)'/)
    const imageSrcMatch = blockquoteMatch[0].match(/src: ([^\s}]*)/)
    const textMatch = blockquoteMatch[1].match(/>([\s\S]*?)<\/Blockquote>/)

    blockquote = {
      author: {
        name: authorNameMatch ? authorNameMatch[1] : '',
        role: authorRoleMatch ? authorRoleMatch[1] : '',
      },
      image: { src: imageSrcMatch ? imageSrcMatch[1].trim() : '' },
      text: textMatch
        ? textMatch[1].trim()
        : blockquoteMatch[1].replace(/<[^>]+>/g, '').trim(),
    }
  }

  const statListMatch = mdxString.match(/<StatList>[\s\S]*?<\/StatList>/)
  if (statListMatch) {
    const statListItems = statListMatch[0].match(
      /<StatListItem value="([^"]+)" label="([^"]+)" \/>/g,
    )
    if (statListItems) {
      statListItems.forEach((stat) => {
        const statMatch = stat.match(
          /<StatListItem value="([^"]+)" label="([^"]+)" \/>/,
        )
        if (statMatch) {
          stats.push({ value: statMatch[1], label: statMatch[2] })
        }
      })
    }
  }

  const topTipMatch = mdxString.match(/<TopTip>([\s\S]*?)<\/TopTip>/)
  if (topTipMatch) {
    topTipContent = topTipMatch[1].trim()
  }

  const cleanedMdxString = mdxString
    .replace(/<TagList>[\s\S]*?<\/TagList>/, '')
    .replace(/<Blockquote[\s\S]*?>([\s\S]*?)<\/Blockquote>/, '')
    .replace(/<StatList>[\s\S]*?<\/StatList>/, '')
    .replace(/<TopTip>[\s\S]*?<\/TopTip>/, '')

  const otherText = cleanedMdxString.trim()

  return {
    tags,
    blockquote,
    stats,
    otherText,
    topTipContent,
  }
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content }) => {
  const { tags, blockquote, stats, otherText, topTipContent } =
    extractDataFromMDX(content)
  const isBlockquoteEmpty =
    !blockquote.author.name &&
    !blockquote.author.role &&
    !blockquote.image.src &&
    !blockquote.text

  return (
    <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
      <div className="typography">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {otherText}
        </ReactMarkdown>
        {topTipContent && <TopTip>{topTipContent}</TopTip>}
        <TagList>
          {tags.map((tag, index) => (
            <TagListItem key={index}>{tag.tagName}</TagListItem>
          ))}
        </TagList>
        {/* {!isBlockquoteEmpty && (
          <Testimonial author={blockquote.author}>
            {blockquote.text}
          </Testimonial>
        )} */}
        <StatList>
          {stats.map((stat, index) => (
            <StatListItem key={index} label={stat.label} value={stat.value} />
          ))}
        </StatList>
      </div>
    </div>
  )
}
