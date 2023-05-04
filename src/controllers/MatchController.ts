import { Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Match } from '../entities/Match';
import { Team } from '../entities/Team';
import { ILike } from 'typeorm';

class MatchController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { idhost, idvisitor, date } = req.body

        if (!idhost || idhost.toString().trim === '' || !idvisitor || idvisitor.toString().trim === '') {
            return res.json({ error: 'ID is required' })
        }

        if (!date || date.toString().trim === '') {
            return res.json({ error: 'Date is required' })
        }

        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })
        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })

        const match = new Match();

        if (!host) {
            return res.json({ error: 'Host not found' })
        }
        else if (!visitor) {
            return res.json({ error: 'Visitor not found' })
        }
        else {
            match.host = host;
            match.visitor = visitor;
            match.date = date;
    
            const response: any = await AppDataSource.manager.save(Match, match) // tipo e objeto
                .catch((e: any) => {
                    return { error: e.message }
                })
    
            return res.json(response);
        }
    }

    public async read(req: Request, res: Response): Promise<Response> {
        const { limit, offset } = req.body;

        const matches = await AppDataSource.getRepository(Match).find({
            order: {
                date: "DESC"
            },
            relations: {
                host: true,
                visitor: true
            },
            skip: offset,
            take: limit
        });

        return res.json(matches)
    }

    public async readById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const matches = await AppDataSource.getRepository(Match).find({
            where: [{
                host: {
                    id: id
                }
            },
            {
                visitor: {
                    id: id
                }
            }],
            order: {
                date: 'DESC'
            },
            relations: {
                host: true,
                visitor: true
            }
        });

        return res.json(matches)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, idhost, idvisitor, date } = req.body

        const match = await AppDataSource.getRepository(Match).findOneBy({ id })

        if (!idhost || idhost.toString().trim === '' || !idvisitor || idvisitor.toString().trim === '') {
            return res.json({ error: 'ID is required' })
        }

        if (!date || date.toString().trim === '') {
            return res.json({ error: 'Date is required' })
        }

        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })
        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })

        if (!match) {
            return res.json({ error: 'Match not found' })
        }
        else if (!host) {
            return res.json({ error: 'Host not found' })
        }
        else if (!visitor) {
            return res.json({ error: 'Visitor not found' })
        }
        else {
            match.host = host;
            match.visitor = visitor;
            match.date = date;
    
            const response: any = await AppDataSource.manager.save(Match, match) // tipo e objeto
                .catch((e: any) => {
                    return { error: e.message }
                })
    
            return res.json(response)
        }        
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body

        const match = await AppDataSource.getRepository(Match).findOneBy({ id })

        const response: any = await AppDataSource.getRepository(Match).delete(match) // tipo e objeto
            .catch((e: any) => {
                return {
                    raw: [],
                    affected: 0
                }
            })

        return res.json(response)
    }
}

const match = new MatchController();

export default match;