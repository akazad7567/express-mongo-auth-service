import { ServiceDataHandler } from "../services/files/service.dataHandler";


const dataHandler = ServiceDataHandler.getInstance();
const givenJsonText = '{"state":"stateData"}';
const givenJsonText2 = '';

describe("Data Write Service", ()=> {
    it("check if it writes valid data into file", (done) =>{
        dataHandler.writeData(givenJsonText).then((returnedData)=>{
            expect(givenJsonText).toBe(returnedData.toString());
        });
        done();
    });
    it("check if it writes invalid data into file", (done) =>{
        dataHandler.writeData(givenJsonText2).then((returnedData)=>{
            expect(givenJsonText2).toBe(returnedData.toString());
        });
        done();
    });
});

describe("Data Read Service", ()=> {
    it("check if can get data from file", (done) => {
        dataHandler.getData().then((returnedData)=>{
            expect(givenJsonText).toBe(JSON.stringify(returnedData));
        });
        done();
    });
});










