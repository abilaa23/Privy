const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")
const jsonSchema = require('chai-json-schema')
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);
chai.use(jsonSchema);

const api = chai.request('http://pretest-qa.dcidev.id')
var phone = faker.phone.phoneNumber();


describe('Registration Test', function (){
    this.timeout(20000);

    it('Registration Test', function (done){
        
        api.post(`/api/v1/register`)
           .set('Content-Type', 'multipart/form-data')
           .field('phone' , `${phone}`)
           .field('password', 'Rahasia123')
           .field('country', 'Indonesia')
           .field('latlong', 'Indonesia')
           .field('device_token', '123')
           .field('device_type', '1')
            
           .end(function (err, res) {
               console.log(res.body)
               global.user_id = res.body.data.user.id;
               expect(res.status).to.equals(201);
               expect(res.body.data.user).to.have.property('id');
               expect(res.body.data.user).to.have.property('phone');
               expect(res.body).to.be.jsonSchema(require ('./schema/auth_schema.json'));
               done();
           });

    });
});
