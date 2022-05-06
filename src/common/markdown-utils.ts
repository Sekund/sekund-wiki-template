/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import fm from 'front-matter';
import slugify from 'slugify';

import { Note } from '../domain/Note';

const wikiLinkRe = /\[\[([^\]\[:]+)\|([^\]\[:]+)\]\]|\[\[([^\]\[:]+)\]\]/gm;
const hyperlinkRe = /!?\[([^\]]*)\]\(([^\)]+)\)/gm;

// const inclusionsRe = /!\[\[(.*?)\]\]/gm;

function pathToNote(path: string | undefined, wikiNotes: Note[]): Note | null {
  if (path) {
    for (const wikiNote of wikiNotes) {
      if (wikiNote.path.endsWith(`${path}.md`)) {
        return wikiNote;
      }
    }
  }
  return null;
}

export function transformHyperlinks(md: string): string {
  const hyperlinks = [...md.matchAll(hyperlinkRe)];
  if (hyperlinks && hyperlinks.length > 0) {
    let replaced = md;
    for (let i = 0; i < hyperlinks.length; i += 1) {
      const hyperlink = hyperlinks[i];
      if (hyperlink) {
        const link = hyperlink[0];
        const label = hyperlink[1];
        const href = hyperlink[2];
        replaced = replaced.replace(
          `${link}`,
          `<ExternalLink href="${href}" label="${label}"/>`
        );
      }
    }
    return replaced;
  }
  return md;
}

export function transformWikiLinks(md: string, wikiNotes: Note[]): string {
  const links = [...md.matchAll(wikiLinkRe)];

  if (links && links.length > 0) {
    let replaced = md;
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      if (link) {
        const hasLabel = link[3] === undefined;
        const wikiLink = link[0];
        const label = hasLabel ? link[2] : link[3];
        const path = hasLabel ? link[1] : link[3];
        const note = pathToNote(path, wikiNotes);
        if (note) {
          const { attributes } = fm(note.content);
          if (attributes && (attributes as any).maturity) {
            const maturity = (attributes as any).maturity as number;
            if (maturity <= 0) {
              replaced = replaced.replace(
                `${wikiLink}`,
                `<WiltLink href="/${note._id}/${slugify(
                  note.path.replace('.md', '')
                )}" label="${label}"/>`
              );
            }
            switch (maturity) {
              case 10:
                replaced = replaced.replace(
                  `${wikiLink}`,
                  `<SeedLink href="/${note._id}/${slugify(
                    note.path.replace('.md', '')
                  )}" label="${label}"/>`
                );
                break;
              case 20:
                replaced = replaced.replace(
                  `${wikiLink}`,
                  `<SeedlingLink href="/${note._id}/${slugify(
                    note.path.replace('.md', '')
                  )}" label="${label}"/>`
                );
                break;
              case 30:
                replaced = replaced.replace(
                  `${wikiLink}`,
                  `<LeafLink href="/${note._id}/${slugify(
                    note.path.replace('.md', '')
                  )}" label="${label}"/>`
                );
                break;
              default:
                replaced = replaced.replace(
                  `${wikiLink}`,
                  `<LeafLink href="/${note._id}/${slugify(
                    note.path.replace('.md', '')
                  )}" label="${label}"/>`
                );
                break;
            }
          } else {
            replaced = replaced.replace(
              `${wikiLink}`,
              `<LeafLink href="/${note._id}/${slugify(
                note.path.replace('.md', '')
              )}" label="${label}"/>`
            );
          }
        } else {
          replaced = replaced.replace(
            `${wikiLink}`,
            `<BrokenLink label="${label}"/>`
          );
        }
      }
    }
    return replaced;
  }
  return md;
}

export function transformLinks(md: string, wikiNotes: Note[]): string {
  let result = transformWikiLinks(md, wikiNotes);
  result = transformHyperlinks(result);
  return result;
}
