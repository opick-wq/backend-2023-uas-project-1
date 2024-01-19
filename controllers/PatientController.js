// import Model Patient
const Patient = require("../models/Patient");
// buat class PatientController
class PatientController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all(); 
    if (patients.length > 0){
      const data = {
        message: "Menampilkkan semua patients",
        data: patients,
      };
      res.status(200).json(data);
    }else{
      const data = {
        message: "patients is empty",
      };
      res.status(200).json(data);
    }
}

async store(req, res) {
  const { name, phone, address, status, in_date_at, out_date_at} = req.body;
  if (!name || !phone || !address || !status || !in_date_at || !out_date_at){
   const data = {
    message : "semua data harus dikirim",
   };

   return res.status(422).json(data);
  }else{
  const patients = await Patient.create(req.body);
  const data = {
    message: "Menambahkan data patients",
    data: patients,
  };

  return res.status(201).json(data);
}
}

//membuat fungsi untuk mengedit data by id dan nama
async update(req, res) {
  const { id } = req.params;
  const patients = await Patient.find(id);

  if (patients){
    const patients = await Patient.update(id, req.body);
    const data = {
      message: `Mengedit patients id`,
      data: patients,
    };
    
    res.status(200).json(data);
}else{
  const data = {
    message: `Data patients id  tidak ditemukan`,
  };
  
  res.status(404).json(data);
}
}

//membuat fungsi untuk menghapus data by id
async destroy(req, res) {
  const { id } = req.params;
  const patients = await Patient.find(id);

  if (patients) {
    await Patient.delete(id);
    const data = {
      message: `Menghapus patients id ${id}`,
      data: patients,
    };

    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patients id ${id} tidak ditemukan`,
    };

    return res.status(404).json(data);
  }
}

async show(req, res) {
  const { id } = req.params;
  const patients = await Patient.find(id);

  if (patients) {
    const data = {
      message: `Menampilkan patients id ${id}`,
      data: patients,
    };

    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patients id ${id} tidak ditemukan`,
    };
    return res.status(404).json(data);
  }
}

async search(req, res) {
  const { name } = req.params;
  const patients = await Patient.search(name);

  if (patients) {
    const data = {
      message: `Menampilkan patients nama ${name}`,
      data: patients,
    };

    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patients nama ${name} tidak ditemukan`,
    };
    return res.status(404).json(data);
  }
}

async positive(req, res) {
  const status = "positive";
  const patient = await Patient.findByStatus(status);
  const total = await Patient.total(status);

  if (patient) {
    const data = {
      message: `Menampilkan patient yang ${status}`,
      total: total,
      data: patient,
    };

    // The reqeust succeeded
    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patient yang ${status} tidak ditemukan`,
    };

    // Resource not found
    return res.status(404).json(data);
  }
}

// Get Recovered Resource
async recovered(req, res) {
  const status = "recovered";
  const patient = await Patient.findByStatus(status);
  const total = await Patient.total(status);

  if (patient) {
    const data = {
      message: `Menampilkan patient yang sembuh`,
      total: total,
      data: patient,
    };

    // The reqeust succeeded
    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patient yang sembuh tidak ditemukan`,
    };

    // Resource not found
    return res.status(404).json(data);
  }
}

// Get Dead Resource
async dead(req, res) {
  const status = "dead";
  const patient = await Patient.findByStatus(status);
  const total = await Patient.total(status);

  if (patient) {
    const data = {
      message: `Menampilkan patient yang meninggal`,
      total: total,
      data: patient,
    };

    // The reqeust succeeded
    return res.status(200).json(data);
  } else {
    const data = {
      message: `Data patient yang meninggal tidak ditemukan`,
    };

    // Resource not found
    return res.status(404).json(data);
  }
}
}


// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
