import request from 'supertest';
import app from '../../src/app';
import * as HttpStatus from 'http-status';
import {ResponseStatus} from "../../src/shared/response.interface";
import {SuccessMessages} from "../../src/shared/messages/success-messages.enum";

describe('End To End Test', () => {
  it('should work fine', async (done) => {
    const res = await request(app).get('/api').set('Accept', 'application/json');
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.status).toBe(ResponseStatus.SUCCESS);
    expect(res.body.message).toBeDefined();
    expect(res.body.message).toBe(SuccessMessages.WELCOME_HOME);
    done();
  });
});
