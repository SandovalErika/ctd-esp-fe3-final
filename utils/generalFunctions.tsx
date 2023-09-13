import { Comics, Result } from "interface/comic";

const countComics = (comics: Comics) => {
    return comics?.total && Math.floor(comics?.total / 12);
}

// const joinThumbnailUrlAndExtension = (result : Result ) => {
//     return result.thumbnail.path.concat(".", result.thumbnail.extension)
// }

export default countComics;