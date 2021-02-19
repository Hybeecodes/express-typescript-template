import {RequestHandler, Request, Response} from "express";
import * as HttpStatus from 'http-status';

import {IConfigService} from "../shared/services/config/config.service.interface";
import {ResponseDto} from "../shared/response.dto";
import {ResponseStatus} from "../shared/response.interface";
import {SuccessMessages} from "../shared/messages/success-messages.enum";

export class HomeController {
    private readonly configService: IConfigService;
    constructor(configService: IConfigService) {
        this.configService = configService
    }
    home: RequestHandler = (req: Request, res: Response) => {
        const data = { title: this.configService.get<string>('APP_NAME')}
        const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.WELCOME_HOME, data);
        res.status(HttpStatus.OK).json(resObj);
    };
}
