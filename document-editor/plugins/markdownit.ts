import mdit from 'markdown-it'
import hljs  from 'highlight.js'
import { escape } from 'html-escaper'

export default defineNuxtPlugin(() => {
  const render = new mdit({
    breaks: true,
    html: true,
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

  return {
    provide: {
      md: render,
    }
  }
})
