/* eslint-disable prettier/prettier */
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module';
import passport from 'passport';
import {json} from 'express';

(async () => {

    console.log('NEST');
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    console.log('PASSPORT');
    app.use(json({limit: '6mb'}))
    app.use(passport.initialize());
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    console.log('LISTEN');

    await app.listen(process.env.PORT || 80);
    console.log('LISTENING');
})();



