import NCMB from 'ncmb';

export default class DB {
  constructor() {
    this.ncmb = new NCMB("7632a46b4429c5fea509d9aab732d8753b94995d468eb38a981704ed6cf1985c","4637d751e635ac5f1e7cad9e64fa4b5527f5b53aec2c3b7d2619e0b69bd24631");
    this.WorkClass = this.ncmb.DataStore('Work');
    this.UsrClass = this.ncmb.DataStore('Usr');
  }
  createWork(contents, deadline) {
    let work = new this.WorkClass();
    return work
    .set("work_contents", contents)
    .set("end_day", deadline.getTime())
    .set("fg", 1)
    .save()
    .catch(function(error){
      console.error(error);
    });
  }
  getAllActiveWorks() {
    return this.WorkClass
    .greaterThanOrEqualTo("fg", 1)
    .fetchAll()
    .catch(function(error) {
      console.error(error);
    });
  }
  getAllUserPoints() {
    return this.UsrClass
    .fetchAll()
    .catch(function(error) {
      console.error(error);
    });
  }
}
