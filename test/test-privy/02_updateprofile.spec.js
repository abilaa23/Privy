const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")
const jsonSchema = require('chai-json-schema')
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);
chai.use(jsonSchema);

const api = chai.request('http://pretest-qa.dcidev.id')
var name = faker.name.findName();
var birthday = faker.datatype.datetime();
var hometown = faker.address.cityName();
var bio = faker.random.words();


describe('Update Profile Test', function (){
    this.timeout(20000);

    it('Update Profile Test', function (done){
        
        api.post(`/api/v1/profile`)
           .set('Content-Type', 'multipart/form-data')
           .set({"Authorization": `Bearer 6fe5789709a9b4653f16e58d2d7deea1b64ff2e44c9310bd1c20a260bb1c1c5d`})
           .field('name' , `${name}`)
           .field('gender', '1')
           .field('birthday', `${birthday}`)
           .field('hometown', `${hometown}`)
           .field('bio', `${bio}`)
            
           .end(function (err, res) {
               console.log(res.body)
               expect(res.status).to.equals(201);
               expect(res.body.data.user).to.have.property('id');
               expect(res.body.data.user).to.have.property('name');
               expect(res.body).to.be.jsonSchema(require ('./schema/updateprofile_schema.json'));
               done();
           });

    });
});
