import { Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Team } from '../entities/Team';
import { ILike } from 'typeorm';

class TeamController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body

        if (!name || name.trim === '') {
            return res.json({ error: 'Name is required' })
        }

        const team = new Team();

        team.name = name;

        const response: any = await AppDataSource.manager.save(Team, team) // tipo e objeto
            .catch((e: any) => {
                return { error: 'Name already registered' }
            })

        return res.json(response);
    }

    public async read(req: Request, res: Response): Promise<Response> {
        const teams = await AppDataSource.getRepository(Team).find({
            order: {
                name: 'ASC'
            }
        });

        return res.json(teams)
    }

    public async readByName(req: Request, res: Response): Promise<Response> {
        const { name } = req.params

        const teams = await AppDataSource.getRepository(Team).find({
            where: {
                name: ILike(`%${name}%`)
            },
            order: {
                name: 'ASC'
            }
        });

        return res.json(teams)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body

        const team = await AppDataSource.getRepository(Team).findOneBy({ id })

        if (!team) {
            return res.json({ error: 'Team not found' })
        }
        else if (!name || name.trim === '') {
            return res.json({ error: 'Name is required' })
        }
        else {
            team.name = name

            const response: any = await AppDataSource.manager.save(Team, team) // tipo e objeto
                .catch((e: any) => {
                    return { error: 'Name already registered' }
                })
    
    
            return res.json(response)
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body

        const team = await AppDataSource.getRepository(Team).findOneBy({ id })

        const response: any = await AppDataSource.getRepository(Team).delete(team) // tipo e objeto
            .catch((e: any) => {
                return {
                    raw: [],
                    affected: 0
                }
            })

        return res.json(response)
    }
}

const team = new TeamController();

export default team;