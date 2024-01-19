// import database
const db = require("../config/database");
// membuat class Patient
class Patient {
   /**
   * Membuat method static all.
   */
   static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

   /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
   static  async create(data, callback) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET  ?";
      db.query(sql, data,(err, results) => {
          resolve(results.insertId);
      });
    });

    const Patient = this.find(id);
    return Patient;
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, result) => {
        const  [patients] = result;
        resolve(result);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE name = ?";
      db.query(sql, name, (err, result) => {
        const  [patients] = result;
        resolve(result);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE status = ?";
      db.query(sql, status, (err, result) => {
        const  [patients] = result;
        resolve(result);
      });
    });
  }

  

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, result) => {
        resolve(result);
      });
    });

    const patients = await this.find(id);
    return patients;
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }
}



// export class Patient
module.exports = Patient;
