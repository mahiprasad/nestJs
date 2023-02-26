import { Module } from '@nestjs/common';
import {MongoClient, Db} from 'mongodb';


@Module({
    providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async (): Promise<Db> => {
            try {
              const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
                //useUnifiedTopology: true
              });
    
              return client.db('FoodDB');
            } catch (e) {
              console.log(e);
              throw e;
            }
          }
        },
      ],
      exports: ['DATABASE_CONNECTION'],
})

export class DatabaseModule {}

