import fs from 'fs';
import path from 'path'
import type { DefaultTheme } from 'vitepress/theme'
interface SortMoreOption { sort?: boolean, sortMode?: 'initial' | 'number' }
export const generateSidebar = (enterDir: string, outDir: string, { sort = true, sortMode = 'initial' }: SortMoreOption): DefaultTheme.SidebarItem[] => {
    const sortSidebar = (sidebar: DefaultTheme.SidebarItem[]) => {
        if (!sort) return
        const mode = {
            initial: () => {
                sidebar.sort((a, b) => {
                    let aText = a.text as string
                    let bText = b.text as string
                    return aText[0].localeCompare(bText[0])
                })
            },
            number: () => {
                sidebar.sort((a, b) => {
                    let aText = (a.text as string).split('-')[0] || 1
                    let bText = (b.text as string).split('-')[0] || 1
                    return (aText as number) - (bText as number)
                })
            }
        }
        mode[sortMode]()

    }
    const getText = (fileName: string) => {
        const mode = {
            initial: () => fileName.split('.')[0],
            number: () => {
                let textArr = fileName.split('.')[0].split('-')
                // let text = textArr[0] ? 
                return textArr[0]
            }
        }
        return mode[sortMode]()
    }
    const rootPath = path.join(__dirname, enterDir)
    let files = fs.readdirSync(rootPath);
    const getSidebar = (files: string[], father: string, rootPath: string): DefaultTheme.SidebarItem[] => {
        let sidebars = files.map((dirOrFileName): DefaultTheme.SidebarItem => {
            let statPath = path.join(rootPath, father, dirOrFileName)
            let stat = fs.lstatSync(statPath);
            if (stat.isFile()) {
                if (!dirOrFileName.includes('.md')) return { text: '' }
                return { text: getText(dirOrFileName), link: `${outDir}/${father}/${dirOrFileName}` }
            } else if (stat.isDirectory()) {
                let files = fs.readdirSync(statPath);
                return {
                    text: getText(dirOrFileName),
                    collapsed: true,
                    items: (() => {
                        let sidebar = getSidebar(files, `${father}/${dirOrFileName}`, rootPath).filter((i) => Boolean(i.text)) as DefaultTheme.SidebarItem[]
                        sortSidebar(sidebar)
                        return sidebar
                    })()
                }
            } else {
                return { text: '' }
            }
        })
        sidebars = sidebars.filter((i) => Boolean(i!.text)) as DefaultTheme.SidebarItem[]
        sortSidebar(sidebars)
        return sidebars
    }
    let sidebar: DefaultTheme.Sidebar = getSidebar(files, '', rootPath)
    return sidebar
}