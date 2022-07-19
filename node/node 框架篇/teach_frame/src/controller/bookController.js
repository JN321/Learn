import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";
import data from '../../mock/data';


@Controller('/book')
export default class BookController {

    @RequestMapping(RequestMethod.GET, '/all')
    async getAllBooks(ctx) {
        console.log(ctx.querystring)
        const [key, page] = ctx.querystring.split('=');
        ctx.body = {
            data: data._embedded.episodes.slice((page - 1) * 10, page * 10 - 1),
            count: data._embedded.episodes.length
        }
    }
}