import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import fs from 'fs';
import path from 'path'
const useSidebar = (enterDir: string, outDir: string): DefaultTheme.Sidebar => {
  const rootPath = path.join(__dirname, enterDir)
  let files = fs.readdirSync(rootPath);
  const getSidebar = (files: string[], father: string, rootPath: string): DefaultTheme.SidebarItem[] => {
    let sidebars = files.map((dirOrFileName): DefaultTheme.SidebarItem | undefined => {
      let statPath = path.join(rootPath, father, dirOrFileName)
      let stat = fs.lstatSync(statPath);
      if (stat.isFile()) {
        if (!dirOrFileName.includes('.md')) return
        return { text: dirOrFileName.split('.')[0], link: `${outDir}/${father}/${dirOrFileName}` }
      } else if (stat.isDirectory()) {
        let files = fs.readdirSync(statPath);
        if (!files.length) return {}
        return {
          text: dirOrFileName,
          collapsed: true,
          items: getSidebar(files, `${father}/${dirOrFileName}`, rootPath)
        }
      } else {
        return {}
      }
    })
    return sidebars.filter((i) => Boolean(i)) as DefaultTheme.SidebarItem[]
  }
  let sidebar: DefaultTheme.Sidebar = getSidebar(files, '', rootPath)
  return sidebar
}
export default defineConfig({
  srcDir: './src',
  srcExclude: ['**/README.md'],
  title: "Salt_Fish",
  description: "Salt_Fish`s BLOG",
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    sidebar: useSidebar('../src/pages', '/pages/'),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Saltedfish117?tab=repositories' }
    ]
  },
  vite: {
    publicDir: '../public',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, '../src') },
        { find: '@static', replacement: path.resolve(__dirname, '../src/static') }
      ]
    }
  },
})
