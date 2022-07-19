import Router from 'koa-router';
import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";
import db from '../models/index';
import { Op } from 'sequelize';


@Controller('/user')
export default class UserController {

    @RequestMapping(RequestMethod.GET, '/all')
    async getAllUser(ctx) {
        const userInfo = await db.users.findAll({
            where: {
                name: {
                    [Op.not]: null
                }
            }
        });
        ctx.body = userInfo;
    }

    @RequestMapping(RequestMethod.GET, '/add')
    async addRandomUser(ctx) {
        db.users.create({id: parseInt(Math.random() * 100000)})
    }

    @RequestMapping(RequestMethod.GET, '/addten')
    async addRandomTenUser(ctx) {
        const userList = new Array(10).fill(0).map((item, idx) => ({id: parseInt(Math.random() * 100000), name: 'person'+idx}))
        db.users.bulkCreate(userList)
    }
}