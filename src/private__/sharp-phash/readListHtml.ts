import { IQueryListPhash } from '../types/IQueryListPhash';

export async function readListHtml(listing: IQueryListPhash) {
  const queryList = listing.list;
  return queryList.map(([path, id, radius]) => {
    const html = `
    <br/>
    <a href="${path}">
      <img width="200" src="file://${path}"/>
      <br/>
      ${path}
    </a>
    <br/>
    [id:${id} radius:${radius}]
    `;
    const result = parseInt(radius) > -2 ? html : '';

    console.log(result);
    return [html];
  });
}
