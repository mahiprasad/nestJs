import {Injectable, Inject, BadRequestException, NotFoundException} from '@nestjs/common';
import { Db } from 'mongodb';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminService{

   constructor(
    @Inject('DATABASE_CONNECTION')
    private database : Db,
    private mailerService: MailerService,
   ) {}
   
   //mongodb shorthand
   db = this.database.collection('people');

   //send otp mail
   async sendMail(email,otp){
    await this.mailerService.sendMail({
        to: email,
        from: 'oyebeautydev@gmail.com',
        subject: 'Verification Mail',
        html: `<h4>Your verification otp is: </h4> <h1> ` + otp + `</h1>`,
    })
    return 'mail sent';
   }

    //find by Email in db
    async getByEmail(email)
    : Promise <any> {
    try {
        
        //1 if invalid email   
        console.log(email);
        if(!email) throw new BadRequestException;
        
        //2 generate otp
        const otp = Math.floor(100000+Math.random()*90000);
         
        //3 if email in admins, update with new otp
        const response = await this.db.findOneAndUpdate(
            {email: email},
            {$set: {tempOtp: otp}}
            );
        console.log(response);

        //4 once db is updated, send mail with otp
        response ? this.sendMail(email,otp): NotFoundException;
    } catch(error) {
        throw new BadRequestException;
    }
    }

    
    //On receiving otp from frontend
    async verifyOtp(otp)
    : Promise <any> {
        try {

            //1 if invalid format
            if(!otp) throw new BadRequestException;

            //2 verify otp with db
            const response = await this.db.findOneAndUpdate(
                {tempOtp: otp},
                {$set: {tempOtp: null}}
                );
            
            response.lastErrorObject.updatedExisting ? console.log('otp verified!') : new NotFoundException;
        } catch(err) {
            throw new BadRequestException;
        }
    } 
       

    // async findAll(): Promise <any[]> {
    //     return await this.db.collection('admins').find().toArray();
    // }


    // async create(body: CreateAdminDto)
    // : Promise <any> {
    //     const admin = await this.db.collection('people').insertOne(body);
    //     return body;
    // }


    // async update(
    //     adminId: string,
    //     body: UpdateAdminDto,
    //     ): Promise <any> {
    //         if(!ObjectID.isValid(adminId)){
    //             throw new BadRequestException;
    //         }
    //         const response = await this.db.collection('people').updateOne(
    //             { _id: new ObjectID(adminId), },
    //             { $set: { ...body, }, },
    //         );
    //         return {...response};
    // }


    // async getOne(adminId: string): Promise <any> {
    //     if (!ObjectID.isValid(adminId)) {
    //         throw new BadRequestException;
    //     }
    //     const response = await this.db.collection('admins').findOne({
    //         _id: new ObjectID(adminId),
    //       });
    //     if (!response) {
    //         throw new NotFoundException;
    //     }
    //     return response;
    // }


    // async delete(adminId: string): Promise <any> {
    //     if(!ObjectID.isValid(adminId)){
    //         throw new BadRequestException;
    //     }
    //     const response = await this.db.collection('people').deleteOne({
    //         _id: new ObjectID(adminId),
    //     })
    //     if(response.deletedCount === 0){
    //         throw new NotFoundException;
    //     }
    //     return adminId;
    // }

    //validate email
    async validateEmail(email): Promise<any> {
        const res = await this.db.findOne({email: email});
        res ? console.log(res): console.log(email);
        return res;
    }

    // async getMe(): Promise <any[]> {
    //     return await this.db.find().toArray();
    // }

}