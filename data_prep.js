var fs = require("fs");

const Sequelize = require('sequelize');
var sequelize = new Sequelize('qvedcwvm', 'qvedcwvm', 'QUZKOqO18ybKmdaZO4F4M7zMSD2HbQHh', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    },
    query: { raw: true }
});

var Student = sequelize.define('Student', {
    StudId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT

});



exports.prep = () => {
    // console.log("Testing");
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve()
        }).catch(err => { reject("unable to sync the database") })
    });
};

exports.bsd = () => {
    return new Promise((resolve, reject) => {

        Student.findAll({
            where: {
                program: "BSD"
            }
        }).then(student => {
            resolve(student)
        }).catch(err => reject("no results returned(BSD)"))
    });
}


exports.cpa = () => {
    return new Promise((resolve, reject) => {

        Student.findAll({
            where: {
                program: "CPA"
            }
        }).then(student => {
            resolve(student)
        }).catch(err => reject("no results returned(CPA)"))
    });
}


exports.highGPA = () => {
    return new Promise((resolve, reject) => {

        let high = 0;

        let highStudent;
        Student.findAll().then(student => {
            for (let i = 0; i < student.length; i++) {

                //console.log(students[i].gpa, high);

                if (student[i].gpa > high) {

                    high = student[i].gpa;

                    highStudent = student[i];

                }

            }

            (highStudent) ? resolve(highStudent) : reject("Failed finding student with highest GPA");

        }).catch(err => {
            reject("Failed finding student with highest GPA")
        })




    });
};

exports.lowGPA = () => {
    return new Promise((resolve, reject) => {

        let low = 4.0;

        let lowStudent;

        Student.findAll().then(student => {

            for (let i = 0; i < student.length; i++) {

                if (student[i].gpa < low) {

                    low = student[i].gpa;

                    lowStudent = student[i];

                }

            }

            resolve(lowStudent);
        }).catch(err => { reject("no results returned") })


    })
};

exports.allStudents = () => {
    return new Promise((resolve, reject) => {
        Student.findAll().then(data => {
            resolve(data)
        }).catch(err => reject('no results returned'))
    })
}

exports.addStudent = (stud) => {
    return new Promise((resolve, reject) => {

        Student.create({
            StudId: stud.studId,
            name: stud.name,
            program: stud.program,
            gpa: stud.gpa
        }).then(() => {
            resolve()
        }).catch(err => reject("unable to add the student"))
    });
}

exports.getStudent = (studId) => {

}
