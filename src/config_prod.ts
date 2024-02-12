const config = {
    data_file:"move.json",
    jesmine:{
        "spec_dir": "spec",
        "spec_files": [
            '**/*.spec.js'
        ],
        "stopSpecOnExpectationFailure": true
    },
    mongo: {
        url: 'mongodb://127.0.0.1:27017/',
        dbName: 'test',
      },

};

export = config ;