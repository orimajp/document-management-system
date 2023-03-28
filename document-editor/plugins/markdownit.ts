import mdit from 'markdown-it'
import hljs  from 'highlight.js'
import { escape } from 'html-escaper'
//@ts-ignore
import container from 'markdown-it-container'
//@ts-ignore
import markdownItMermaid from "@ispicyfish/markdown-it-mermaid"
//@ts-ignore
import markdownItPlantuml from 'markdown-it-plantuml'
import markdownItAnchor from 'markdown-it-anchor'
//@ts-ignore
import markdownItFootnote from 'markdown-it-footnote'
//@ts-ignore
import markdownItIns from 'markdown-it-ins'
//@ts-ignore
import markdownItSub from 'markdown-it-sub'
//@ts-ignore
import markdownItAbbr from 'markdown-it-abbr'
//@ts-ignore
import markdownItDeflist from 'markdown-it-deflist'
//@ts-ignore
import markdownItVideo from 'markdown-it-video'

export default defineNuxtPlugin(() => {
  const render = new mdit({
    breaks: true,
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</code></pre>';
        } catch (error) {console.log(error)}
      }

      return '<pre class="hljs"><code>' + escape(str) + '</code></pre>';
    }
  })
  .use(container, 'alert-primary')
  .use(container, 'alert-secondary')
  .use(container, 'alert-info')
  .use(container, 'alert-success')
  .use(container, 'alert-warning')
  .use(container, 'alert-danger')
  .use(container, 'notice', {
    validate(params: string) {
      return params.trim().match(/^notice\s+(.*)$/)
    },
    render(tokens: { info: string; nesting: number }[], idx: number) {
      const m = tokens[idx].info.trim().match(/^notice\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        // @ts-ignore
//        const escapedHtml = md.utils.escapeHtml(m[1])
        const escapedHtml = escape(m[1])
        return `<div class="notices ${escapedHtml}-style"><p>`
      }
      return '</p></div>'
    }
  })
  .use(markdownItMermaid, { themeVariables: { fontSize: '14px' } })
  .use(markdownItPlantuml)
  .use(markdownItAnchor)
  .use(markdownItFootnote)
  .use(markdownItIns)
  .use(markdownItSub)
  .use(markdownItAbbr)
  .use(markdownItDeflist)
  .use(markdownItVideo)

  return {
    provide: {
      md: render,
    }
  }
})
